export const eventPreset = `[
  {
    "type": "presence.arrived",
    "actor": "Charlie"
  },
  {
    "type": "plug.session_start",
    "device": "tv"
  },
  {
    "type": "plug.session_end",
    "device": "tv",
    "duration_sec": 1800
  },
  {
    "type": "irrigation.zone_done",
    "zone": "lawn",
    "duration_min": 25
  }
]`;

export const interpreters = {
	home: `{
    "map": {
      "presence.arrived": "{actor} กลับบ้านแล้ว",
      "plug.session_start": "{device} เริ่มทำงาน",
      "plug.session_end": "{device} ปิดแล้ว · {duration_min} นาที",
      "irrigation.zone_done": "สนามหญ้าได้น้ำแล้ว · {duration_min} นาที"
    }
  }`,

	rover: `{
    "map": {
      "presence.arrived": "Crew re-entered habitat",
      "plug.session_start": "Subsystem {device} activated",
      "plug.session_end": "Subsystem {device} shutdown · {duration_min} min",
      "irrigation.zone_done": "Hydration cycle complete · {duration_min} min"
    }
  }`,

	cyberpunk: `{
    "map": {
      "presence.arrived": ">> identity {actor} detected",
      "plug.session_start": "⚡ node[{device}] online",
      "plug.session_end": "⚡ node[{device}] offline :: {duration_min}m",
      "irrigation.zone_done": "~~ green patch hydrated ({duration_min}m)"
    }
  }`
};
