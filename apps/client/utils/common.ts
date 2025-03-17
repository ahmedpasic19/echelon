export function debounce<T extends (...args: any[]) => any>(
   func: T,
   delay: number,
): (...args: Parameters<T>) => void {
   let timeoutId: ReturnType<typeof setTimeout>
   return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
      const context = this
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
         func.apply(context, args)
      }, delay)
   }
}

export function format(date: Date, formatString: string): string {
   const year: number = date.getFullYear()
   const month: number = date.getMonth() + 1
   const day: number = date.getDate()
   const hours: number = date.getHours()
   const minutes: number = date.getMinutes()
   const seconds: number = date.getSeconds()

   return formatString
      .replace('yyyy', year.toString())
      .replace('YYYY', year.toString())
      .replace('MM', month.toString().padStart(2, '0'))
      .replace('dd', day.toString().padStart(2, '0'))
      .replace('DD', day.toString().padStart(2, '0'))
      .replace('HH', hours.toString().padStart(2, '0'))
      .replace('mm', minutes.toString().padStart(2, '0'))
      .replace('ss', seconds.toString().padStart(2, '0'))
}

export function round(number: number, precision = 0) {
   const multiplier = Math.pow(10, precision)
   return Math.round(number * multiplier) / multiplier
}
