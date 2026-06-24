import type { RcFile } from 'antd/es/upload/interface';

export interface StreamEvent {
  event:
    | 'node_start'
    | 'stream_content'
    | 'node_complete'
    | 'workflow_complete'
    | 'workflow_terminated';
  node?: string;
  message?: string;
  content?: string;
  result?: {
    imageDetect_path: string;
    imageProcess_path: string;
    detect_result: string;
    process_result: string;
    final_result: string;
  };
}

export interface AnalyzeImageParams {
  imageDetect: File;
  imageProcess: File;
  thickness_map_uuid?: string;
}

export interface StreamCallback {
  onNodeStart?: (node: string) => void;
  onStreamContent?: (content: string) => void;
  onNodeComplete?: () => void;
  onWorkflowComplete?: (result: StreamEvent['result']) => void;
  onWorkflowTerminated?: (message: string) => void;
}

const BASE_URL = '/api/backend';

export class QwenVLAPI {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async analyzeImage(
    params: AnalyzeImageParams,
    callbacks?: StreamCallback
  ): Promise<void> {
    const { imageDetect, imageProcess, thickness_map_uuid } = params;

    const formData = new FormData();
    formData.append('imageDetect', imageDetect);
    formData.append('imageProcess', imageProcess);
    if (thickness_map_uuid !== undefined) {
      formData.append('thickness_map_uuid', thickness_map_uuid);
    }

    try {
      const response = await fetch(`${this.baseUrl}/qwen-vl/analyze-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;

          try {
            const data: StreamEvent = JSON.parse(line);
            this.handleStreamEvent(data, callbacks);
          } catch (e) {
            console.error('JSON Parse Error:', e, line);
          }
        }
      }
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  private handleStreamEvent(data: StreamEvent, callbacks?: StreamCallback): void {
    switch (data.event) {
      case 'node_start':
        callbacks?.onNodeStart?.(data.node || '处理中...');
        break;

      case 'stream_content':
        if (data.content) {
          callbacks?.onStreamContent?.(data.content);
        }
        break;

      case 'node_complete':
        callbacks?.onNodeComplete?.();
        break;

      case 'workflow_complete':
        callbacks?.onWorkflowComplete?.(data.result);
        break;

      case 'workflow_terminated':
        callbacks?.onWorkflowTerminated?.(data.message || '工作流已终止');
        break;
    }
  }
}

export const qwenVLAPI = new QwenVLAPI();
