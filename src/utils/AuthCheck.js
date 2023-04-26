import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

const authCheck = (WrappedComponent) => {
    const Auth = (props) => {
        const router = useRouter()
        const [isLoading, setIsLoading] = useState()
        const [user, setUser] = useState()

        const {token} = useSelector(state => state.userData)
        if(!token) {
            router.push('/auth/login')
            return
        }
        return <WrappedComponent {...props} />
    }

    Auth.getInitialProps = async(ctx) => {
        const wrappedComponentInitialProps = WrappedComponent.getInitialProps ?
        await WrappedComponent.getInitialProps(ctx) : {}
        return {...wrappedComponentInitialProps}
    }

    return Auth
}

export default authCheck