/**
 * Analog Design — component barrel export.
 *
 * Import everything from a single path:
 *
 *   import { StatusBadge, NetworkGraph, RotaryKnob } from '@components';
 */

// ===== v0.2 Foundation =====================================

// Badges & labels
export { default as StatusBadge     } from './StatusBadge.astro';
export { default as IDTag           } from './IDTag.astro';
export { default as ChannelLabel    } from './ChannelLabel.astro';

// Typography
export { default as KanaLabel       } from './KanaLabel.astro';

// Data
export { default as DataCluster     } from './DataCluster.astro';
export { default as MetricBlock     } from './MetricBlock.astro';
export { default as LogLine         } from './LogLine.astro';

// Indicators
export { default as SignalBar       } from './SignalBar.astro';
export { default as ProgressStepped } from './ProgressStepped.astro';

// Graphics
export { default as Crosshair       } from './Crosshair.astro';
export { default as Burst           } from './Burst.astro';
export { default as NodeMap         } from './NodeMap.astro';

// Frames
export { default as Panel           } from './Panel.astro';
export { default as Terminal        } from './Terminal.astro';

// ===== v0.3 Expansion =======================================

// Inputs / hardware-style
export { default as KeycapButton    } from './KeycapButton.astro';
export { default as RotaryKnob      } from './RotaryKnob.astro';

// Static graphics
export { default as AsciiDivider    } from './AsciiDivider.astro';
export { default as DeviceFrame     } from './DeviceFrame.astro';

// Animated charts & telemetry
export { default as Sparkline       } from './Sparkline.astro';
export { default as Oscilloscope    } from './Oscilloscope.astro';
export { default as BusinessChart   } from './BusinessChart.astro';

// Animated flow / network / circuit
export { default as ProcessFlow     } from './ProcessFlow.astro';
export { default as CircuitTrace    } from './CircuitTrace.astro';
export { default as NetworkGraph    } from './NetworkGraph.astro';
