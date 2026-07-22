import { getContributionCalendar, ContributionDay } from "@/lib/github";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";

const LEVEL_CLASSES: Record<ContributionDay["level"], string> = {
  0: "bg-muted/40",
  1: "bg-primary/25",
  2: "bg-primary/50",
  3: "bg-primary/75",
  4: "bg-primary",
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Label a week's column when it starts a new month, skipping repeats. */
function monthLabels(weeks: ContributionDay[][]): (string | null)[] {
  let previousMonth = -1;
  return weeks.map((week) => {
    const month = new Date(week[0].date).getUTCMonth();
    if (month === previousMonth) return null;
    previousMonth = month;
    return MONTH_LABELS[month];
  });
}

export async function GitHubContributions() {
  const calendar = await getContributionCalendar(env.GITHUB_USERNAME);

  if (!calendar) return null;

  const labels = monthLabels(calendar.weeks);

  return (
    <div>
      <div
        className="overflow-x-auto pb-1"
        tabIndex={0}
        role="img"
        aria-label={`GitHub contribution calendar: ${calendar.total} contributions in the last year`}
      >
        <div className="w-max">
          <div className="flex gap-[3px] text-xs text-muted-foreground mb-1">
            {labels.map((label, index) => (
              <span key={index} className="w-[12px] overflow-visible">
                {/* Skip the last columns' labels so they don't spill past the grid */}
                {label && index < labels.length - 2 ? label : ""}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {calendar.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <span
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    className={cn(
                      "h-[12px] w-[12px] rounded-[2px]",
                      LEVEL_CLASSES[day.level]
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <span>{calendar.total} contributions in the last year</span>
        <span className="flex items-center gap-1">
          Less
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span
              key={level}
              className={cn(
                "h-[10px] w-[10px] rounded-[2px]",
                LEVEL_CLASSES[level]
              )}
            />
          ))}
          More
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Client work in private organizations is only partially counted here due
        to their access policies.
      </p>
    </div>
  );
}
