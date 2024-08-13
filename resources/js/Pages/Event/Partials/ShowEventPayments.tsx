import { EventPayment } from "@/types";

export default function ShowEventPayments({payments}:{payments:EventPayment[]|undefined})
{
  return(
    <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
            <tr>
                <th className="border border-gray-300 px-4 py-2">Value</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
        </thead>
        <tbody>
          {
            payments?.map((payment, index) => {
              return (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2" data-cy="deposits">{payment.deposit}</td>
                  <td className="border border-gray-300 px-4 py-2" data-cy="deposits-date">{payment.date}</td>
              </tr>
              )
            })
          }
            
            
        </tbody>
    </table>
</div>
  )
}