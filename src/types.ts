import React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  videoUrl: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ProjectState {
  model: string;
  userPrompt: string;
  systemInstruction?: string;
  temperature?: number;
  topK?: number;
  topP?: number;
}
