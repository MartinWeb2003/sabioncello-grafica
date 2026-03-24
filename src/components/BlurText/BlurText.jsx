import { motion } from 'motion/react';
import { useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

/**
 * BlurText — plays immediately when mounted (no IntersectionObserver).
 * Use a changing `key` prop on the parent to retrigger on every slide change.
 */
const BlurText = ({
  text = '',
  delay = 80,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.3,
  as: Tag = 'p',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const defaultFrom = useMemo(
    () => direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, y: -30 }
      : { filter: 'blur(10px)', opacity: 0, y: 20 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(4px)', opacity: 0.6, y: direction === 'top' ? 3 : -3 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <Tag className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            key={index}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
            initial={fromSnapshot}
            animate={animateKeyframes}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment}
          </motion.span>
        );
      })}
    </Tag>
  );
};

export default BlurText;
