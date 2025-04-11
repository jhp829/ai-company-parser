import { CompanyProfile } from '../types/company';
import { GPTService } from './ai/gpt';

export interface AIService {
  generateCompanyProfile(url: string): Promise<CompanyProfile>;
}

export enum AIServiceType {
  GPT = 'gpt',
  // Add other AI service types here as needed
}

class AIServiceWrapper implements AIService {
  private service: AIService;
  private isLoading: boolean = false;

  constructor(serviceType: AIServiceType = AIServiceType.GPT) {
    switch (serviceType) {
      case AIServiceType.GPT:
        this.service = new GPTService();
        break;
      // Add other service cases here
      default:
        throw new Error(`Unsupported AI service type: ${serviceType}`);
    }
  }

  public async generateCompanyProfile(url: string): Promise<CompanyProfile> {
    if (this.isLoading) {
      throw new Error('A request is already in progress');
    }

    this.isLoading = true;
    try {
      return await this.service.generateCompanyProfile(url);
    } finally {
      this.isLoading = false;
    }
  }
}

export function getAIService(serviceType: AIServiceType = AIServiceType.GPT): AIService {
  return new AIServiceWrapper(serviceType);
} 