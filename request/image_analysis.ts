export interface ThicknessMapImageResponse {
  thickness_map_id: number;
  thickness_map_uuid: string;
  start_time: string | null;
  end_time: string | null;
  map_image_path: string | null;
  pure_map_image_path: string | null;
  combined_image_path: string | null;
  data_points_count: number;
  min_thickness: number | null;
  max_thickness: number | null;
  avg_thickness: number | null;
  is_abnormal: boolean;
  created_at: string | null;
}

export interface ImageAnalysisWithImagesListResponse {
  items: ThicknessMapImageResponse[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface FullImageResponse {
  thickness_map_uuid: string;
  combined_image_base64: string | null;
}

export interface ImageAnalysisResultResponse {
  id: number;
  thickness_map_uuid: string;
  detection_agent_result: string | null;
  processing_agent_result: string | null;
  decision_agent_result: string | null;
  comment: string | null;
  use_rag: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
  use_rag?: boolean;
  thickness_map_uuid?: string;
  is_abnormal?: boolean;
}

export interface UpdateCommentRequest {
  thickness_map_uuid: string;
  comment: string;
  use_rag: boolean;
}

const BASE_URL = '/api/backend';

export class ImageAnalysisAPI {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getAnalysisResultsPaginated(
    params: PaginationParams = {}
  ): Promise<ImageAnalysisWithImagesListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.page !== undefined) {
      queryParams.append('page', params.page.toString());
    }
    if (params.page_size !== undefined) {
      queryParams.append('page_size', params.page_size.toString());
    }
    if (params.use_rag !== undefined) {
      queryParams.append('use_rag', params.use_rag.toString());
    }
    if (params.thickness_map_uuid !== undefined) {
      queryParams.append('thickness_map_uuid', params.thickness_map_uuid.toString());
    }
    if (params.is_abnormal !== undefined) {
      queryParams.append('is_abnormal', params.is_abnormal.toString());
    }

    const url = `${this.baseUrl}/image-analysis/paginated?${queryParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ImageAnalysisWithImagesListResponse = await response.json();
      return data;
    } catch (error) {
      console.error('获取历史诊断数据失败:', error);
      throw error;
    }
  }

  async getFullImage(thicknessMapUuid: string): Promise<FullImageResponse> {
    const url = `${this.baseUrl}/image-analysis/image`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thickness_map_uuid: thicknessMapUuid,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FullImageResponse = await response.json();
      return data;
    } catch (error) {
      console.error('获取完整图片失败:', error);
      throw error;
    }
  }

  async getAnalysisResult(thicknessMapUuid: string): Promise<ImageAnalysisResultResponse> {
    const url = `${this.baseUrl}/image-analysis/analysis-result`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thickness_map_uuid: thicknessMapUuid,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ImageAnalysisResultResponse = await response.json();
      return data;
    } catch (error) {
      console.error('获取分析结果失败:', error);
      throw error;
    }
  }

  async updateComment(request: UpdateCommentRequest): Promise<ImageAnalysisResultResponse> {
    const url = `${this.baseUrl}/image-analysis/comment`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ImageAnalysisResultResponse = await response.json();
      return data;
    } catch (error) {
      console.error('更新批注失败:', error);
      throw error;
    }
  }
}

export const imageAnalysisAPI = new ImageAnalysisAPI();
