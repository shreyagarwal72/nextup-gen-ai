import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { theme, tone, platform } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are NextGen AI, an expert creative assistant for content creators, YouTubers, and digital artists. You help generate professional content for any platform or purpose.

When the user asks for content generation, respond with a JSON object containing these fields:
{
  "script": "A detailed, engaging script or content text. Use **bold** for emphasis on key points, actions, or important phrases. Adapt length based on content type (2-3 paragraphs for shorts, 4-5 for long videos, or appropriate length for other content).",
  "title": "A catchy, SEO-friendly title under 60 characters that captures attention",
  "description": "A compelling description with hooks and CTAs (150-250 words). Use **bold** for key selling points and important information.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"],
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "thumbnailIdea": "A vivid description of a thumbnail or visual concept with **bold** text for key visual elements"
}

FORMATTING RULES:
- Use **text** for bold/emphasis (important phrases, key actions, highlights)
- Use *text* for subtle emphasis or italics
- Keep formatting natural and professional
- Bold should enhance readability, not overwhelm

CONTENT PRINCIPLES:
- Platform-optimized (adjust style for YouTube, TikTok, Instagram, etc.)
- Tone-appropriate (funny, emotional, cinematic, motivational, educational)
- SEO-friendly with relevant keywords
- Engaging and authentic
- Action-oriented with clear CTAs
- Well-formatted with markdown styling

FLEXIBILITY:
- Adapt to ANY content request (tutorials, reviews, vlogs, shorts, stories, ads, etc.)
- Generate appropriate tags and hashtags for the specific content type
- Adjust script length and style based on platform and content type
- Provide creative thumbnail ideas that match the content theme`;

    const userPrompt = `Generate content for:
Theme/Idea: ${theme}
Tone: ${tone}
Platform: ${platform}

Provide complete, ready-to-use content.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI gateway returned ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Invalid response format from AI");
    }

    return new Response(
      JSON.stringify(parsedContent),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-content function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
