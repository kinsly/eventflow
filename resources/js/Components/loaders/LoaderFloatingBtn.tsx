import { ThreeCircles } from 'react-loader-spinner'

export default function LoaderFloatingBtn()
{
  return(
    <ThreeCircles
        visible={true}
        height="50"
        width="50"
        color="red"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
  )
}