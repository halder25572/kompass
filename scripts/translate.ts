// // scripts/translate.ts
// // Usage: npx tsx scripts/translate.ts
// // en.json
//
// import fs from "fs";
// import path from "path";
//
// const EN_PATH = path.join(process.cwd(), "messages/en.json");
// const DE_PATH = path.join(process.cwd(), "messages/de.json");
//
// type JsonValue = string | JsonObject;
// interface JsonObject {
//   [key: string]: JsonValue;
// }
//
// async function translate(): Promise<void> {
//   const en: JsonObject = JSON.parse(fs.readFileSync(EN_PATH, "utf-8"));
//   const de: JsonObject = fs.existsSync(DE_PATH)
//     ? JSON.parse(fs.readFileSync(DE_PATH, "utf-8"))
//     : {};
//
//   const missing = findMissingKeys(en, de);
//
//   if (Object.keys(missing).length === 0) {
//     return;
//   }
//
//   const apiKey = process.env.ANTHROPIC_API_KEY;
//   if (!apiKey) {
//     throw new Error("ANTHROPIC_API_KEY environment variable is missing!");
//   }
//
//   const response = await fetch("https://api.anthropic.com/v1/messages", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-api-key": apiKey,
//       "anthropic-version": "2023-06-01",
//     },
//     body: JSON.stringify({
//       model: "claude-sonnet-4-20250514",
//       max_tokens: 4096,
//       messages: [
//         {
//           role: "user",
//           content: `Translate the following JSON values from English to German.
// Keep the JSON structure exactly the same. Only translate the values, not the keys.
// Return ONLY valid JSON, no explanation, no markdown backticks.
//
// ${JSON.stringify(missing, null, 2)}`,
//         },
//       ],
//     }),
//   });
//
//   const data = await response.json();
//   const translatedText = (data.content[0] as { text: string }).text.trim();
//   const translated: JsonObject = JSON.parse(translatedText);
//
//   const updatedDe = deepMerge(de, translated);
//   fs.writeFileSync(DE_PATH, JSON.stringify(updatedDe, null, 2), "utf-8");
//
// }
//
// function findMissingKeys(en: JsonObject, de: JsonObject): JsonObject {
//   const missing: JsonObject = {};
//   for (const key of Object.keys(en)) {
//     const enVal = en[key];
//     const deVal = de[key];
//     if (typeof enVal === "object" && enVal !== null) {
//       const nested = findMissingKeys(enVal, (deVal as JsonObject) || {});
//       if (Object.keys(nested).length > 0) {
//         missing[key] = nested;
//       }
//     } else {
//       if (!deVal) {
//         missing[key] = enVal;
//       }
//     }
//   }
//   return missing;
// }
//
// function deepMerge(target: JsonObject, source: JsonObject): JsonObject {
//   const result: JsonObject = { ...target };
//   for (const key of Object.keys(source)) {
//     const srcVal = source[key];
//     const tgtVal = target[key];
//     if (typeof srcVal === "object" && typeof tgtVal === "object") {
//       result[key] = deepMerge(tgtVal, srcVal);
//     } else {
//       result[key] = srcVal;
//     }
//   }
//   return result;
// }
//
// translate().catch(console.error);