import { Hr } from "../_components/SHr";

const { SMain } = require("../_components/SMain")
const { SSection } = require("../_components/SSection")
const { default: ServerLayerNavbar } = require("../_ui/serverLayerNavbar")

const Contact = () => {

    return (
        <>
            <ServerLayerNavbar />
            <SMain>
                <SSection>
                    <h2 className="px-4">Welcome to Supercomic.info!</h2>
                    <br />
                    <p className="text-slate-300 px-4">
                        We are a platform dedicated to providing information and
                        showcasing a variety of artistic works. Our site serves
                        as a hub for the promotion and dissemination of creative
                        pieces, all offered for free to our audience. We want to
                        emphasize that there is no charge associated with
                        accessing or reading the featured works on our site.
                        Supercomic.info is sustained solely through
                        advertising, ensuring that our visitors can enjoy a
                        wealth of content without any cost. Thank you for being
                        a part of our community
                    </p>
                    <Hr />
                    <h2 className="px-4">About the Ads</h2>
                    <br />
                    <p className="text-slate-300 px-4">
                        At Supercomic.info, we enhance user experience by
                        utilizing link shorteners for our ads. This approach
                        ensures a seamless and enjoyable browsing experience on
                        our site, allowing us to maintain a platform{" that's"}{" "}
                        both user-friendly and accessible.
                    </p>
                    <Hr />
                    <h2 className="px-4">Credit the authors</h2>
                    <br />
                    <p className="text-slate-300 px-4">
                        We are not the owners of the works published on
                        Supercomic.info. Our site gives full credit to the
                        creators of these works, as we aim to provide a platform
                        that respects and acknowledges the original artists. All
                        intellectual property rights belong to the respective
                        creators, and we encourage users to support the official
                        releases.
                    </p>
                    <Hr />
                    <h2 className="px-4">Contact</h2>
                    <br />
                    <p className="text-slate-300 px-4">
                        For any inquiries, suggestions, bug reports, or if you
                        wish to submit a comic for consideration, feel free to
                        reach out to us via email at{" "}
                        <a href="mailto:contact@supercomic.info">
                            <strong>contact@supercomic.info</strong>
                        </a>
                        . Please ensure that any comic links for submission are
                        hosted on cloud platforms. Additionally, users can
                        request content removal through this email address. We
                        appreciate your feedback and engagement in improving our
                        platform.
                    </p>
                    <Hr />

                    <h2 className="px-4">Terms of Consent</h2>
                    <br />
                    <p className="text-slate-300 px-4">
                        By accessing and using Supercomic.info, you hereby
                        acknowledge and agree to the following terms:
                    </p>
                    <ol className="text-slate-300 px-4 mt-2">
                        <li>
                            <strong>Link Shorteners:</strong> Users understand
                            that the site utilizes link shorteners for
                            advertising purposes, providing support for the
                            platform.
                        </li>
                        <li>
                            <strong>Sensitive Themes:</strong> Some mangas
                            featured on this site may contain sensitive themes
                            that could be perceived as morally inappropriate.
                            Users accept the responsibility of choosing content
                            in accordance with their own preferences and
                            sensitivities.
                        </li>
                    </ol>
                    <p className="text-slate-300 px-4 my-2">
                        Your continued use of the site implies your acceptance
                        of these terms. If you do not agree with any part of
                        these terms, please refrain from using Supercomic.info.
                    </p>
                </SSection>
            </SMain>
        </>
    );
}

export default  Contact