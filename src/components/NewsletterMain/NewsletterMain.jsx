import React from 'react';

function NewsletterMain(props) {

    return (
        <section className="newsletter-area section-padding-100-0">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-12 col-lg-6 col-xl-7">
                        <div className="newsletter-text mb-100">
                            <h2>Subscribe for a <span>25% Discount</span></h2>
                            <p>Nulla ac convallis lorem, eget euismod nisl. Donec in libero sit amet mi vulputate consectetur. Donec auctor interdum purus, ac finibus massa bibendum nec.</p>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 col-xl-5">
                        <div className="newsletter-form mb-100">
                            <form action="#" method="post">
                                <input type="email" name="email" className="nl-email" placeholder="Your E-mail" />
                                <input type="submit" value="Subscribe" />
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default React.memo(NewsletterMain);