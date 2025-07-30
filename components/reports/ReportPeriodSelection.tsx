// // 'use client';

// // import Link from 'next/link';
// // import { Button } from '../ui/button';
// // import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
// // import { useState } from 'react';
// // import { useReport } from '../../hooks/useReport';

// // const HeaderPeriodSelection = () => {
// //   const { report, loading, error } = useReport({
// //     period: 'last-month',
// //   });
// //   const [filter, setFilter] = useState<string>('all');

// //   return (
// //     <div className="w-full px-4 sm:px-6 lg:px-8 my-4">
// //       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
// //         <h1 className="text-lg font-bold hidden lg:block">
// //           Report & Analytics
// //         </h1>

// //         <div className="flex justify-end items-center gap-2 w-full lg:w-auto">
// //           <Link
// //             href="/report-analytics/generate-reports"
// //             className="w-full sm:w-auto"
// //           >
// //             <Button className="w-full bg-darkblue hover:bg-lightblue">
// //               Export
// //             </Button>
// //           </Link>
// //           <Select value={filter} onValueChange={setFilter}>
// //             <SelectTrigger className="w-full sm:w-auto border border-lightblue capitalize">
// //               {filter === 'all' ? 'All time' : filter}
// //             </SelectTrigger>
// //             <SelectContent className="border border-lightblue">
// //               <SelectItem value="all">All time</SelectItem>
// //               <SelectItem value="daily">Daily</SelectItem>
// //               <SelectItem value="weekly">Weekly</SelectItem>
// //               <SelectItem value="monthly">Monthly</SelectItem>
// //               <SelectItem value="yearly">Yearly</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HeaderPeriodSelection;

// 'use client';

// import Link from 'next/link';
// import { Button } from '../ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';

// import { useState } from 'react';
// import { ReportQuery } from '@/lib/services/report';
// // import { useReport } from '../../hooks/useReport';

// // type ReportPeriod = 'last-week' | 'last-month' | 'last-6-months' | 'last-year';

// const HeaderPeriodSelection = () => {
//   const [period, setPeriod] = useState<ReportQuery['period']>('last-week');

//   // const { report, loading, error } = useReport({ period });

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 my-4">
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
//         <h1 className="text-lg font-bold hidden lg:block">
//           Report & Analytics
//         </h1>

//         <div className="flex justify-end items-center gap-2 w-full lg:w-auto">
//           <Link
//             href="/report-analytics/generate-reports"
//             className="w-full sm:w-auto"
//           >
//             <Button className="w-full bg-darkblue hover:bg-lightblue">
//               Export
//             </Button>
//           </Link>

//           <select
//             value={period}
//             onChange={(e) => setPeriod(e.target.value as ReportQuery['period'])}
//             className="border border-muted p-2 rounded-md text-sm"
//           >
//             <option value="last-week">Last Week</option>
//             <option value="last-month">Last Month</option>
//             <option value="last-6-months">Last 6 Months</option>
//             <option value="last-year">Last Year</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeaderPeriodSelection;
