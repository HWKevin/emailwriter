export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/generate" className="transition hover:text-slate-300">
            AI Email Writer
          </a>
          <a href="/ai-email-reply-generator" className="transition hover:text-slate-300">
            Reply Generator
          </a>
          <a href="/follow-up-email-generator" className="transition hover:text-slate-300">
            Follow-Up Email
          </a>
        </div>
        <p>&copy; 2026 AI Email Writer by ZenryPro. Generate professional emails in seconds.</p>
      </div>
    </footer>
  );
}
