export interface Summary {
  info: string,
  years: {
    [key: number]: {
      total: number,
      months: {
        [key: number]: {
          name: string,
          total: number,
          categories: {
            [key: string]: number
          }
        }
      }
    }
  }
}
