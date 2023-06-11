import {logtoClient} from '@/libraries/logto'
import {Card, CardBody} from "@nextui-org/card";
import {Link} from "@nextui-org/link";
import {Button} from "@nextui-org/react";
import {FaGithub} from "react-icons/fa";
import {InferGetServerSidePropsType} from "next";
export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Card>
                <CardBody className="font-bold">
                    <h1 className="text-4xl flex justify-center">Billing</h1>
                    <span className="text-2xl pt-2">A billing app built by <a href="https://github.com/Badbird5907">Badbird5907</a></span>
                    <div className="flex justify-between items-center mt-4">
                        <Link href="/api/logto/sign-in">
                            <Button color="primary">Sign In</Button>
                        </Link>
                        <Link href="https://github.com/Badbird5907/billing" target="_blank">
                            <Button isIconOnly variant="faded">
                                <FaGithub />
                            </Button>
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export const getServerSideProps = logtoClient.withLogtoSsr(async function ({req, res,}) {
    const {user} = req

    if (user.isAuthenticated) {
        res.setHeader('location', '/dashboard')
        res.statusCode = 302
        res.end()
    }
    return {
        props: {},
    }
})
