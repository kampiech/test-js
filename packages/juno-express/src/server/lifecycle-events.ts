import Emittery, {EventName} from 'emittery';

export const lifecycleEvents = new Emittery();

type Listener = (eventData: Record<EventName, any>) => void | Promise<void>;

export const beforeServerStart = (listener: Listener) => {
  lifecycleEvents.on('beforeServerStart', listener);
};

export const beforeServerShutdown = (listener: Listener) => {
  lifecycleEvents.on('beforeServerShutdown', listener);
};
