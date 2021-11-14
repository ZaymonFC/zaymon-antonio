import create from "zustand";

const initialNavigationState = {
  current: 0,
  points: {} as { [rank: number]: [number, number] },
};

type Direction = "Left" | "Right";

const calculateMove = (n: number, current: number, direction: Direction) => {
  switch (direction) {
    case "Right":
      return Math.min(current + 1, n - 1);
    case "Left":
      return Math.max(0, current - 1);
  }
};

type NavigationState = typeof initialNavigationState & {
  recordPoint: (rank: number, point: [number, number]) => void;
  move: (dir: Direction) => void;
};

export const useNavigation = create<NavigationState>((set) => ({
  ...initialNavigationState,
  recordPoint: (rank, point) =>
    set((state) => ({ ...state, points: { ...state.points, [rank]: point } })),
  move: (dir) =>
    set((state) => ({
      ...state,
      current: calculateMove(Object.keys(state.points).length, state.current, dir),
    })),
}));
