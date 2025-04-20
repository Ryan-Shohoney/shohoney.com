import * as React from "react"
import { navigate } from "gatsby"
import Seo from "../components/seo"

const NotFoundPage = () => {
  React.useEffect(() => {
    navigate("/")
  }, [])
  
  return null
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage