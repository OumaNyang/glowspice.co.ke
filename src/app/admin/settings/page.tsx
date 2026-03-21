import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-[var(--bark)]">Platform Settings</h1>
        <p className="text-[var(--gray-500)] mt-1">Configure global application parameters.</p>
      </div>

      <form className="bg-white rounded-md border border-[var(--border)] shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[var(--bark)] mb-4">Store Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--bark)] mb-2">Store Name</label>
              <input type="text" defaultValue="GlowSpice" className="w-full border border-[var(--border)] rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[var(--spice)]"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--bark)] mb-2">Support Email</label>
              <input type="email" defaultValue="support@glowspice.co.ke" className="w-full border border-[var(--border)] rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[var(--spice)]"/>
            </div>
          </div>
        </div>
        
        <hr className="border-[var(--border)]" />

        <div>
          <h2 className="text-lg font-bold text-[var(--bark)] mb-4">SEO Defaults</h2>
          <div>
            <label className="block text-sm font-semibold text-[var(--bark)] mb-2">Meta Description</label>
            <textarea rows={3} defaultValue="Premium Spices & Herbs delivered across Uganda." className="w-full border border-[var(--border)] rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[var(--spice)]"/>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="button" className="flex items-center gap-2 px-6 py-2.5 bg-[var(--spice)] hover:bg-[var(--spice-dark)] text-white font-semibold rounded-md text-sm transition-colors shadow-sm">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
