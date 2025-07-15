export interface EsgScore {
  subject: 'E' | 'S' | 'G';
  value: number;
  maxValue: number;
}

export interface Benchmark {
  category: string;
  industry: number;
  ours: number;
  maxValue: number;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
} 