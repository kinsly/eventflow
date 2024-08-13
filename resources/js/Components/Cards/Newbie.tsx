/**
 * 
 * This card is used in welcome page to as a information card
 */
export default function Newbie()
{
  return(
    <div className="mt-16">
      <div className="">
          <div className="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
              <div>
                  <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  Get Registered
                  </h2>

                  <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Currently this is a invitation only application. Please contact administrator to 
                  activate your account.
                  </p>
              </div>
          </div>
      </div>
  </div>
  )
}