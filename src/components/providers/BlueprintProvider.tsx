'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { fetchBlueprintThunk } from '@/redux/slices/blueprint/blueprintThunk';
import { selectActiveTheme, selectThemeContext, selectBlueprintLastFetched, selectBlueprintLoading, setThemeContext } from '@/redux/slices/blueprint/blueprintSlice';
import applyTheme from '@/lib/applyTheme';

interface BlueprintProviderProps { children: ReactNode; context?: 'public' | 'admin'; }

const STALE_THRESHOLD = 5 * 60 * 1000;

export default function BlueprintProvider({ children, context = 'public' }: BlueprintProviderProps) {
  const dispatch = useAppDispatch();
  const activeTheme = useAppSelector(selectActiveTheme);
  const themeContext = useAppSelector(selectThemeContext);
  const lastFetched = useAppSelector(selectBlueprintLastFetched);
  const isLoading = useAppSelector(selectBlueprintLoading);
  const hasFetched = useRef(false);

  useEffect(() => { if (themeContext !== context) dispatch(setThemeContext(context)); }, [dispatch, themeContext, context]);

  useEffect(() => {
    if (hasFetched.current) return;
    const shouldFetch = !lastFetched || (Date.now() - new Date(lastFetched).getTime()) > STALE_THRESHOLD;
    if (shouldFetch && !isLoading) { hasFetched.current = true; dispatch(fetchBlueprintThunk()); }
  }, [dispatch, lastFetched, isLoading]);

  useEffect(() => { if (activeTheme) applyTheme(activeTheme, themeContext); }, [activeTheme, themeContext]);

  return <>{children}</>;
}
