import raf from 'rc-util/lib/raf';

export type Rect = ClientRect | DOMRect;

const TRIGGER_EVENTS = ['resize', 'scroll', 'load'];

interface ClientRect {
  bottom: number;
  readonly height: number;
  left: number;
  right: number;
  top: number;
  readonly width: number;
}

export function getTargetRect(target: HTMLElement | Window | null | undefined): ClientRect {
  return target !== window
    ? (target as HTMLElement).getBoundingClientRect()
    : ({ top: 0, bottom: window.innerHeight } as ClientRect);
}

export function getFixedTop(
  placeholderReact: Rect,
  targetRect: Rect,
  offsetTop: number | undefined,
) {
  // console.log(targetRect.top, placeholderReact.top, offsetTop)
  if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
    return offsetTop + targetRect.top;
  }
  return undefined;
}

export function getFixedBottom(
  placeholderReact: Rect,
  targetRect: Rect,
  offsetBottom: number | undefined,
) {
  console.log(targetRect.bottom, placeholderReact.bottom, offsetBottom);
  if (offsetBottom !== undefined && targetRect.bottom < placeholderReact.bottom + offsetBottom) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return undefined;
}

interface ObserverEntities {
  target: HTMLElement | Window;
  eventHandlers: {
    [eventName: string]: any;
  };
}
const observerEntities: ObserverEntities[] = [];

export function getObserverEntities() {
  return observerEntities;
}

export function addObserveTarget(target: HTMLElement | Window | null, lazyUpdatePosition) {
  if (!target) return;

  let entities: ObserverEntities | undefined = observerEntities.find(
    (item) => item.target === target,
  );
  if (!entities) {
    entities = {
      target,
      eventHandlers: {},
    };
    observerEntities.push(entities);

    TRIGGER_EVENTS.forEach((eventName) => {
      entities!.eventHandlers[eventName] = target.addEventListener(eventName, lazyUpdatePosition);
    });
  }
}

export function removeObserveTarget(target, lazyUpdatePosition): void {
  const observerEntity = observerEntities.find(
    (oriObserverEntity) => oriObserverEntity.target === target,
  );

  if (observerEntity) {
    TRIGGER_EVENTS.forEach((eventName) => {
      observerEntity.target.removeEventListener(eventName, lazyUpdatePosition);
    });
  }
}

export function throttleByAnimationFrame(fn: (...args: any[]) => void) {
  let requestId: number | null;

  const later = (args: any[]) => () => {
    requestId = null;
    fn(...args);
  };

  const throttled = (...args: any[]) => {
    if (requestId == null) {
      requestId = raf(later(args));
    }
  };

  (throttled as any).cancel = () => raf.cancel(requestId!);

  return throttled;
}

export function throttleByAnimationFrameDecorator() {
  return function throttle(target: any, key: string, descriptor: any) {
    const fn = descriptor.value;
    let definingProperty = false;
    return {
      configurable: true,
      get() {
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return fn;
        }

        const boundFn = throttleByAnimationFrame(fn.bind(this));
        definingProperty = true;
        Object.defineProperty(this, key, {
          value: boundFn,
          configurable: true,
          writable: true,
        });
        definingProperty = false;
        return boundFn;
      },
    };
  };
}
