import { GroupEntry, Team } from '@prisma/client';

interface GroupTableProps {
  groupName: string;
  entries: (GroupEntry & { team: Team })[];
}

export default function GroupTable({ groupName, entries }: GroupTableProps) {
  const sortedEntries = [...entries].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.roundDiff - a.roundDiff;
  });

  return (
    <div className="glass-panel rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <h3 className="text-storm-blue font-display font-bold tracking-wider uppercase">
          {groupName}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-storm-silver/50 border-b border-white/5 font-display uppercase text-xs">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3 text-center">PT</th>
              <th className="px-6 py-3 text-center">J</th>
              <th className="px-6 py-3 text-center">V</th>
              <th className="px-6 py-3 text-center">D</th>
              <th className="px-6 py-3 text-center">SR</th>
            </tr>
          </thead>

          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr
                key={entry.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors group"
              >
                <td className="px-6 py-4 font-mono text-storm-silver/50">
                  {index + 1}
                </td>

                <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                  {entry.team.logo && (
                    <img
                      src={entry.team.logo}
                      alt=""
                      className="w-6 h-6 rounded object-cover"
                    />
                  )}

                  {entry.team.name}

                  {index < 2 && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-storm-blue shadow-[0_0_8px_#00f0ff]" />
                  )}
                </td>

                <td className="px-6 py-4 text-center font-bold text-storm-blue">
                  {entry.points}
                </td>

                <td className="px-6 py-4 text-center text-storm-silver/70">
                  {entry.played}
                </td>

                <td className="px-6 py-4 text-center text-green-500/80">
                  {entry.won}
                </td>

                <td className="px-6 py-4 text-center text-red-500/80">
                  {entry.lost}
                </td>

                <td className="px-6 py-4 text-center font-mono text-storm-silver">
                  {entry.roundDiff > 0 ? `+${entry.roundDiff}` : entry.roundDiff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
