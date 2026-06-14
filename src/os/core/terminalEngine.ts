import { about, projects, skills, contact } from "../data/portfolio.data";

export type CommandContext = {
  print: (text: string) => void;
  clear: () => void;
};

type CommandHandler = (args: string[], raw: string, ctx: CommandContext) => void | string;

export class TerminalEngine {
  private commands = new Map<string, CommandHandler>();
  private history: string[] = [];
  private historyIndex = -1;
  private buffer: string[] = [];

  // =========================
  // REGISTER COMMAND
  // =========================
  registerCommand(name: string, handler: CommandHandler) {
    this.commands.set(name, handler);
  }

  // =========================
  // COMMAND LIST
  // =========================
  getCommands() {
    return Array.from(this.commands.keys());
  }

  // =========================
  // BUFFER SYSTEM (UI STATE)
  // =========================
  getBuffer() {
    return this.buffer;
  }

  clearBuffer() {
    this.buffer = [];
  }

  private print(text: string) {
    this.buffer.push(text);
  }

  // =========================
  // EXECUTE COMMAND
  // =========================
  execute(input: string) {
    const trimmed = input.trim();
    if (!trimmed) return;

    // history tracking
    this.history.push(trimmed);
    this.historyIndex = this.history.length;

    const [cmd, ...args] = trimmed.split(" ");
    const handler = this.commands.get(cmd);

    if (!handler) {
      this.print(`Command not found: ${cmd}`);
      return;
    }

    const result = handler(args, trimmed, {
      print: (t) => this.print(t),
      clear: () => this.clearBuffer(),
    });

    if (typeof result === "string") {
      this.print(result);
    }
  }

  // =========================
  // HISTORY CONTROL
  // =========================
  historyUp() {
    if (this.history.length === 0) return null;

    this.historyIndex = Math.max(0, this.historyIndex - 1);
    return this.history[this.historyIndex];
  }

  historyDown() {
    if (this.history.length === 0) return null;

    this.historyIndex = Math.min(this.history.length, this.historyIndex + 1);

    if (this.historyIndex === this.history.length) return "";
    return this.history[this.historyIndex];
  }

  // =========================
  // DEFAULT ENGINE
  // =========================
  static buildDefaultEngine() {
    const engine = new TerminalEngine();

    // HELP
    engine.registerCommand("help", (_, __, ctx) => {
      ctx.print("Available commands:");
      ctx.print(engine.getCommands().join(", "));
    });

    // CLEAR
    engine.registerCommand("clear", (_, __, ctx) => {
      ctx.clear();
    });

    // ABOUT
    engine.registerCommand("about", (_, __, ctx) => {
      ctx.print(about.bio);
    });

    // WHOAMI
    engine.registerCommand("whoami", (_, __, ctx) => {
      ctx.print(`${about.name} - ${about.role}`);
    });

    // PROJECTS
    engine.registerCommand("projects", (_, __, ctx) => {
      projects.forEach((p) => {
        ctx.print(`• ${p.name} [${p.status}]`);
        ctx.print(`  ${p.description}`);
      });
    });

    // SKILLS
    engine.registerCommand("skills", (_, __, ctx) => {
      skills.forEach((s) => {
        ctx.print(`${s.category}: ${s.items.join(", ")}`);
      });
    });

    // CONTACT
    engine.registerCommand("contact", (_, __, ctx) => {
      ctx.print(`Email: ${contact.email}`);
      ctx.print(`GitHub: ${contact.github}`);
      if (contact.linkedin) ctx.print(`LinkedIn: ${contact.linkedin}`);
      if (contact.location) ctx.print(`Location: ${contact.location}`);
    });

    return engine;
  }
}
