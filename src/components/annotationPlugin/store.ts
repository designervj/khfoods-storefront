import { create } from 'zustand';

export type CommentStatus = 'open' | 'pending' | 'done';
export type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'all';

export interface Annotation {
  id: string;
  pageId?: string;
  slug?: string;
  _id?: string;
  selector?: string;
  offsetX?: number; // Percentage 0-100
  offsetY?: number; // Percentage 0-100
  content?: string;
  status?: CommentStatus;
  screenSize?: ScreenSize;
  createdAt?: number;
}

export interface AnnotatorSettings {
  showResolved: boolean;
  calibrationMode: boolean;
}

interface AnnotatorStore {
  annotations: Annotation[];
  isCommentModeActive: boolean;
  activeAnnotationId: string | null;
  settings: AnnotatorSettings;
  toggleCommentMode: () => void;
  addAnnotation: (annotation: Omit<Annotation, 'id' | 'createdAt'>) => void;
  removeAnnotation: (id: string) => void;
  updateAnnotationStatus: (id: string, status: CommentStatus) => void;
  updateAnnotationScreen: (id: string, screenSize: ScreenSize) => void;
  updateAnnotationPosition: (id: string, selector: string, offsetX: number, offsetY: number) => void;
  setActiveAnnotationId: (id: string | null) => void;
  updateSettings: (settings: Partial<AnnotatorSettings>) => void;
  setAnnotations: (annotations: Annotation[]) => void;
}

const getAnnotationKey = (annotation: Annotation) => annotation._id ?? annotation.id;

export const useAnnotatorStore = create<AnnotatorStore>()((set: any) => ({
  annotations: [],
  isCommentModeActive: false,
  activeAnnotationId: null,
  settings: {
    showResolved: true,
    calibrationMode: false,
  },
  
  toggleCommentMode: () => set((state: AnnotatorStore) => ({ 
    isCommentModeActive: !state.isCommentModeActive, 
    activeAnnotationId: null 
  })),
  
  addAnnotation: (annotation: Omit<Annotation, 'id' | 'createdAt'>) => set((state: AnnotatorStore) => ({
    annotations: [
      ...state.annotations,
      {
        ...annotation,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: Date.now(),
      }
    ]
  })),
  
  setAnnotations: (annotations: Annotation[]) => set((state: AnnotatorStore) => ({
    annotations: annotations
  })),
  removeAnnotation: (id: string) => set((state: AnnotatorStore) => ({
    annotations: state.annotations.filter((a: Annotation) => getAnnotationKey(a) !== id),
    activeAnnotationId: state.activeAnnotationId === id ? null : state.activeAnnotationId
  })),
  
  updateAnnotationStatus: (id: string, status: CommentStatus) => set((state: AnnotatorStore) => ({
    annotations: state.annotations.map((a: Annotation) => getAnnotationKey(a) === id ? { ...a, status } : a)
  })),

  updateAnnotationScreen: (id: string, screenSize: ScreenSize) => set((state: AnnotatorStore) => ({
    annotations: state.annotations.map((a: Annotation) => getAnnotationKey(a) === id ? { ...a, screenSize } : a)
  })),

  updateAnnotationPosition: (id: string, selector: string, offsetX: number, offsetY: number) => set((state: AnnotatorStore) => ({
    annotations: state.annotations.map((a: Annotation) => getAnnotationKey(a) === id ? { ...a, selector, offsetX, offsetY } : a)
  })),
  
  setActiveAnnotationId: (id: string | null) => set({ activeAnnotationId: id }),

  updateSettings: (newSettings: Partial<AnnotatorSettings>) => set((state: AnnotatorStore) => ({
    settings: { ...state.settings, ...newSettings }
  })),
}));
