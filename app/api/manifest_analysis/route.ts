import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputParser } from "@langchain/core/output_parsers";
export interface format_instructions {
  vulnerabilities: [
    {
      issue: string;
      mitigation: string;
    }
  ];
}

const model = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0,
  });

const output_instruction = `
ONE SHOT JSON OUTPUT EXAMPLE
{
    "vulnerabilities": [
      {
        "issue": "App can be installed on vulnerable Android version (Android 4.0.3-4.0.4, minSdk=15)",
        "mitigation": "Increase minSdkVersion to 29 (Android 10 or above) to ensure that the app is installed only on devices receiving security updates."
      },
      {
        "issue": "Debugging Enabled for App (android:debuggable=true)",
        "mitigation": "Set android:debuggable=false in the production environment to prevent reverse engineering and unauthorized debugging."
      }
    ]
}`;

const promptTemplate = PromptTemplate.fromTemplate(
  `given the data below from a static analysis report provide the mitigations in short points.\nAndroid Manifest anlysis report:\n
  {manifest_analysis}\n\n JSON output instruction:\n{output_instruction}`
);



export async function POST(request: Request) {
  try {
    const parser = new JsonOutputParser<format_instructions>();
    const body = await request.json();
    // console.log(body.manifest_findings);
    
     const partialedPrompt = await promptTemplate.partial({
        output_instruction: output_instruction,
      });

      const chain = partialedPrompt.pipe(model).pipe(parser);

      const res = await chain.invoke({manifest_analysis:JSON.stringify(body.manifest_findings)});
      console.log(res);
      
    return new Response(JSON.stringify(res))
   

  } catch (error) {
    return new Response(JSON.stringify({ message: error }));
  }
}
