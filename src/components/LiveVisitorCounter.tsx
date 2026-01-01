import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users } from 'lucide-react';

const LiveVisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Generate a unique ID for this visitor
    const visitorId = `visitor_${Math.random().toString(36).substring(2, 15)}`;
    
    const channel = supabase.channel('online-users', {
      config: {
        presence: {
          key: visitorId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const count = Object.keys(state).length;
        setVisitorCount(count);
        setIsConnected(true);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
            page: window.location.pathname,
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg">
        <div className="relative flex items-center">
          <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-500 opacity-75 animate-ping" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
        </div>
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          {isConnected ? (
            <>
              <span className="text-primary font-bold">{visitorCount}</span>
              <span className="text-muted-foreground ml-1">
                {visitorCount === 1 ? 'visitor' : 'visitors'} online
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">Connecting...</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default LiveVisitorCounter;
