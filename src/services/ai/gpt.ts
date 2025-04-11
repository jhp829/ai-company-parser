import { CompanyProfile } from '../../types/company';
import OpenAI from 'openai';
import { AIService } from '../aiService';

export class GPTService implements AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  async generateCompanyProfile(url: string): Promise<CompanyProfile> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that generates company profiles based on website URLs. 
            Generate a detailed company profile in JSON format with the following structure:
            {
              "company_name": string,
              "service_line": string[],
              "company_description": string,
              "tier1_keywords": string[],
              "tier2_keywords": string[],
              "emails": string[],
              "poc": { name: string, title: string, email: string }[]
            }
            
            tier1_keywords: keywords that this company would use to search for public
            government opportunities (’solar’ would be a good keyword for a company that
            sells solar panels)

            tier2_keywords: keywords that this company MIGHT use to search for government
            opportunities 

            If the website doesn't seem like a company website, respond with company description as "Not a company website"

            All array fields should be initialized as empty arrays if no data is available.`
          },
          {
            role: "user",
            content: `Generate a company profile for ${url}.`
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No content received from GPT');
      }

      const parsedProfile = JSON.parse(content) as Partial<CompanyProfile>;
      
      // Ensure all required fields are present and arrays are initialized
      return {
        company_name: parsedProfile.company_name || '',
        service_line: Array.isArray(parsedProfile.service_line) ? parsedProfile.service_line : [],
        company_description: parsedProfile.company_description || '',
        tier1_keywords: Array.isArray(parsedProfile.tier1_keywords) ? parsedProfile.tier1_keywords : [],
        tier2_keywords: Array.isArray(parsedProfile.tier2_keywords) ? parsedProfile.tier2_keywords : [],
        emails: Array.isArray(parsedProfile.emails) ? parsedProfile.emails : [],
        poc: Array.isArray(parsedProfile.poc) ? parsedProfile.poc : []
      };
    } catch (error) {
      console.error('Error generating company profile:', error);
      throw error;
    }
  }
} 