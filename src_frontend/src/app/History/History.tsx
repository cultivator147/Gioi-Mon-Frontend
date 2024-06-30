import { NavigateFunction } from 'react-router-dom';

type HistoryObject = {
  navigate: NavigateFunction | null;
  push: (page: string, ...rest: any[]) => void;
};
const History: HistoryObject = {
  navigate: null,
  push: (page, ...rest) => {
    if (History.navigate !== null) {
      console.log('navigating...', page);
      History.navigate(page, ...rest);
    }
  },
};

export default History;
