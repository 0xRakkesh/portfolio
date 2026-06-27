const REVIEW_MIN_LENGTH = 60;
const REVIEW_MAX_LENGTH = 200;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

function cleanReview(value) {
  return String(value || '')
    .replace(/^["'`]+|["'`]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getGeminiText(data) {
  return cleanReview(
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join(' ')
  );
}

async function generateReview(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY environment variable.');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.55,
          maxOutputTokens: 90,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Gemini request failed.');
  }

  return getGeminiText(data);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { username, occupation, review } = req.body || {};
    const draft = cleanReview(review);

    if (!draft && !occupation) {
      return res.status(400).json({ error: 'Add a draft review or occupation first.' });
    }

    const prompt = `
Rewrite or generate a portfolio review.

Rules:
- Return only the review text.
- Must be between ${REVIEW_MIN_LENGTH} and ${REVIEW_MAX_LENGTH} characters.
- Never exceed ${REVIEW_MAX_LENGTH} characters.
- Do not cut off mid-sentence.
- Do not use quotation marks.
- Do not mention AI.
- Keep the tone natural, specific, and professional.

Reviewer name: ${username || 'Not provided'}
Reviewer occupation: ${occupation || 'Not provided'}
Draft review: ${draft || 'No draft provided. Generate one concise review.'}
`;

    let generated = await generateReview(prompt);

    if (generated.length > REVIEW_MAX_LENGTH || generated.length < REVIEW_MIN_LENGTH) {
      generated = await generateReview(`
Rewrite this review again so it is a complete sentence between ${REVIEW_MIN_LENGTH} and ${REVIEW_MAX_LENGTH} characters.
Return only the review text. Do not exceed ${REVIEW_MAX_LENGTH} characters.

Review: ${generated || draft}
`);
    }

    if (generated.length > REVIEW_MAX_LENGTH) {
      return res.status(502).json({
        error: `AI returned a review over ${REVIEW_MAX_LENGTH} characters. Try again.`,
      });
    }

    if (generated.length < REVIEW_MIN_LENGTH) {
      return res.status(502).json({
        error: `AI returned a review under ${REVIEW_MIN_LENGTH} characters. Try again.`,
      });
    }

    return res.status(200).json({ review: generated });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'AI assist failed.',
    });
  }
}
