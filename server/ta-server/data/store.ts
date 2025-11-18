import { Aluno, Monitor, Professor, Turma, Notificacao, LogEntry } from '../models';

export interface AllocationSnapshot {
  monitorId: string;
  alunoIds: string[];
}

class DataStore {
  professors: Professor[] = [];
  monitores: Monitor[] = [];
  alunos: Aluno[] = [];
  turmas: Turma[] = [];
  notificacoes: Notificacao[] = [];
  logs: LogEntry[] = [];

  constructor() {
    this.seed();
  }

  reset(): void {
    this.professors = [];
    this.monitores = [];
    this.alunos = [];
    this.turmas = [];
    this.notificacoes = [];
    this.logs = [];
    this.seed();
  }

  private seed(): void {
    const professor: Professor = {
      id: 'prof-1',
      nome: 'Profa. Helena',
      email: 'helena@universidade.edu',
      senha: 'prof123',
      turmas: ['turma-1']
    };

    const turma: Turma = {
      id: 'turma-1',
      nome: 'Engenharia de Software',
      professorId: professor.id,
      monitores: [],
      alunos: []
    };

    const alunosBase: Aluno[] = [
      { id: 'aluno-1', nome: 'Alice Figueiredo', matricula: '202301', turmaId: turma.id, monitorId: null, email: 'alice@alunos.edu', senha: 'aluno' },
      { id: 'aluno-2', nome: 'Bruno Siqueira', matricula: '202302', turmaId: turma.id, monitorId: null, email: 'bruno@alunos.edu', senha: 'aluno' },
      { id: 'aluno-3', nome: 'Camila Tavares', matricula: '202303', turmaId: turma.id, monitorId: null, email: 'camila@alunos.edu', senha: 'aluno' },
      { id: 'aluno-4', nome: 'Daniel Rocha', matricula: '202304', turmaId: turma.id, monitorId: null, email: 'daniel@alunos.edu', senha: 'aluno' },
      { id: 'aluno-5', nome: 'Eduarda Campos', matricula: '202305', turmaId: turma.id, monitorId: null, email: 'eduarda@alunos.edu', senha: 'aluno' }
    ];

    turma.alunos = alunosBase.map(aluno => aluno.id);

    this.professors.push(professor);
    this.turmas.push(turma);
    this.alunos.push(...alunosBase);
  }
}

export const store = new DataStore();

export function resetStore(): void {
  store.reset();
}
