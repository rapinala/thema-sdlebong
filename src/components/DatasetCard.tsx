import { Link } from "react-router-dom";
import type { CKANDataset } from "../services/ckanService";
import {
  formatDate,
  formatFileSize,
  getPrimaryFormat,
  getPrimaryResource,
} from "../services/ckanService";

function formatIcon(format: string) {
  const f = format.toUpperCase();
  const colors: Record<string, string> = {
    CSV: "from-green-500 to-emerald-500",
    XLSX: "from-emerald-500 to-teal-500",
    XLS: "from-emerald-500 to-teal-500",
    PDF: "from-red-500 to-rose-500",
    SHP: "from-purple-500 to-violet-500",
    JSON: "from-amber-500 to-orange-500",
    GEOJSON: "from-cyan-500 to-blue-500",
    KML: "from-indigo-500 to-purple-500",
    ZIP: "from-slate-500 to-slate-600",
    API: "from-blue-500 to-cyan-500",
  };
  return colors[f] || "from-slate-500 to-slate-600";
}

interface DatasetCardProps {
  dataset: CKANDataset;
  featured?: boolean;
}

export function DatasetCard({ dataset, featured = false }: DatasetCardProps) {
  const format = getPrimaryFormat(dataset);
  const resource = getPrimaryResource(dataset);
  const orgTitle = dataset.organization?.title || "Organisasi tidak diketahui";
  const tags = dataset.tags?.slice(0, 3) || [];
  const views = dataset.tracking_summary?.total || 0;
  const date = dataset.metadata_modified;

  return (
    <Link
      to={`/dataset?id=${dataset.name}`}
      className="group block"
    >
      <article className="h-full bg-white rounded-2xl border border-slate-200 hover:border-lebong-300 hover:shadow-xl hover:shadow-lebong-100/40 transition-all duration-300 overflow-hidden flex flex-col">
        <div className={`h-1.5 bg-gradient-to-r ${formatIcon(format)}`} />

        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          {featured && (
            <span className="self-start inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-semibold uppercase tracking-wider mb-3">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Unggulan
            </span>
          )}

          <div className="flex items-start justify-between gap-3 mb-3">
            <div
              className={`flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br ${formatIcon(format)} text-white shadow-sm flex-shrink-0`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10M7 7a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold uppercase">
              {format}
            </span>
          </div>

          <h3 className="font-display font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-lebong-700 transition-colors leading-snug min-h-[3rem]">
            {dataset.title}
          </h3>

          <p className="text-xs text-slate-500 mb-4 line-clamp-1">{orgTitle}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                >
                  {tag.display_name || tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                {views > 0 && (
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {views.toLocaleString()}
                  </span>
                )}
                {resource?.size && (
                  <span className="flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {formatFileSize(resource.size)}
                  </span>
                )}
              </div>
              <span>{formatDate(date)}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}