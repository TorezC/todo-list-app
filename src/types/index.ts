export type Task = {
id: string;
title: string;
description?: string;
completed: boolean;
createdAt: number; // epoch ms
dueAt?: number; // epoch ms (optional)
};


export type Filter = 'all' | 'completed' | 'incomplete';