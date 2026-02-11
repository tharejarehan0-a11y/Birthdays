const { useState, useEffect, useRef } = React;

// Hero Component
const Hero = () => {
    const hearts = ['💖', '💝', '💗', '💓', '💕'];
    
    return (
        <div className="hero">
            <div className="birthday-badge">
                🎂 Happy Birthday! 🎂
            </div>
            <div className="floating-hearts">
                {[...Array(15)].map((_, i) => (
                    <div 
                        key={i}
                        className="heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 5}s`
                        }}
                    >
                        {hearts[Math.floor(Math.random() * hearts.length)]}
                    </div>
                ))}
            </div>
            <div className="hero-content">
                <h1>Happy Birthday, Ma'am</h1>
                <p className="subtitle">For the moments that shaped who I am today</p>
            </div>
            <div className="scroll-indicator">
                <span>↓</span>
            </div>
        </div>
    );
};

// Story Card Component
const StoryCard = ({ icon, title, year, children, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={cardRef}
            className={`story-card ${className} ${isVisible ? 'visible' : ''}`}
        >
            <div className="card-icon">{icon}</div>
            <h2>{title}</h2>
            {year && <div className="year">{year}</div>}
            {children}
        </div>
    );
};

// Timeline Component
const Timeline = () => {
    const [visibleItems, setVisibleItems] = useState([]);
    const itemRefs = useRef([]);

    useEffect(() => {
        const observers = itemRefs.current.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => [...new Set([...prev, index])]);
                    }
                },
                { threshold: 0.1 }
            );

            if (ref) {
                observer.observe(ref);
            }

            return observer;
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []);

    const timelineEvents = [
        {
            title: "First Applause",
            description: "The English Club recognition that made me believe in my abilities. Your teaching gave me the foundation I didn't even know I was building."
        },
        {
            title: "Second Applause",
            description: "Another moment of validation. Each recognition built upon the last, creating a pattern of confidence that would define my journey."
        },
        {
            title: "The Award - A Serendipitous Moment",
            description: "I was collecting money to give to you, and the very next day, I received the award. It was the only time that award was ever distributed - a moment of perfect timing that I'll never forget."
        },
        {
            title: "The SST Class Announcement",
            description: "You were teaching Social Studies, and I announced some names. Your praise for my confidence wasn't just encouragement - it multiplied that confidence, creating a positive spiral that continues to this day."
        }
    ];

    return (
        <div className="timeline-container">
            <h2 className="timeline-title">Moments That Mattered</h2>
            <div className="timeline">
                {timelineEvents.map((event, index) => (
                    <div 
                        key={index}
                        ref={el => itemRefs.current[index] = el}
                        className={`timeline-item ${visibleItems.includes(index) ? 'visible' : ''}`}
                    >
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Interactive Thank You Component
const InteractiveThankYou = () => {
    const [clicks, setClicks] = useState(0);
    const [message, setMessage] = useState("💫 Happy Birthday Ma'am 💫");
    
    const messages = [
        "💫 Happy Birthday Ma'am 💫",
        "🎂 Wishing You Joy 🎂",
        "✨ You're Amazing ✨",
        "🌟 Forever Grateful 🌟",
        "💝 Best Teacher Ever 💝",
        "🎉 Have A Wonderful Year 🎉",
        "🌈 Thank You So Much 🌈",
        "🎁 You Deserve The Best 🎁"
    ];

    const handleClick = () => {
        setClicks(prev => prev + 1);
        setMessage(messages[clicks % messages.length]);
    };

    return (
        <div className="interactive-thank-you">
            <div 
                className="thank-you-message"
                onClick={handleClick}
            >
                {message}
            </div>
            <div className="click-count">
                {clicks > 0 && `Clicked ${clicks} time${clicks > 1 ? 's' : ''} - Keep clicking for more birthday wishes!`}
            </div>
        </div>
    );
};

// Birthday Wish Component
const BirthdayWish = () => {
    const [isVisible, setIsVisible] = useState(false);
    const wishRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (wishRef.current) {
            observer.observe(wishRef.current);
        }

        return () => {
            if (wishRef.current) {
                observer.unobserve(wishRef.current);
            }
        };
    }, []);

    return (
        <div className="birthday-wish">
            <div 
                ref={wishRef}
                className={`birthday-wish-content ${isVisible ? 'visible' : ''}`}
            >
                <h2>🎉 Happy Birthday, Ma'am! 🎉</h2>
                <div className="birthday-candles">🕯️🕯️🕯️🎂🕯️🕯️🕯️</div>
                <p>
                    On this special day, I wanted to take a moment to celebrate not just 
                    your birthday, but the incredible person you are and the lasting impact 
                    you've had on my life.
                </p>
                <p>
                    May this year bring you as much joy, success, and fulfillment as you've 
                    brought to your students over the years. You deserve all the happiness 
                    in the world!
                </p>
                <p>
                    Thank you for being an exceptional teacher, a wonderful person, and 
                    unknowingly, one of the most influential people in my journey.
                </p>
            </div>
        </div>
    );
};

// Friendship Connection Component
const FriendshipConnection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const friendshipRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (friendshipRef.current) {
            observer.observe(friendshipRef.current);
        }

        return () => {
            if (friendshipRef.current) {
                observer.unobserve(friendshipRef.current);
            }
        };
    }, []);

    return (
        <div className="friendship-connection">
            <div 
                ref={friendshipRef}
                className={`friendship-content ${isVisible ? 'visible' : ''}`}
            >
                <h2>A Beautiful Connection</h2>
                <p>
                    There's something wonderfully serendipitous about life's connections. 
                    You are not just my teacher, but also the mother of one of my only two friends.
                </p>
                <div className="friend-circle">
                    👨‍👩‍👦 Teacher • Mother • Friend's Parent 👨‍👩‍👦
                </div>
                <p>
                    This dual connection makes everything even more special. You've touched my life 
                    in multiple ways - through your teaching, through your son's friendship, and 
                    through the values you've instilled in both of us.
                </p>
                <p>
                    In a world where I have only two close friends, having one of their mothers be 
                    such an influential teacher feels like fate. It's a reminder that the most 
                    meaningful relationships in life often interweave in unexpected ways.
                </p>
                <p>
                    Thank you for raising such a wonderful friend, and thank you for being such 
                    an incredible teacher. Both roles have enriched my life immeasurably.
                </p>
            </div>
        </div>
    );
};

// Final Message Component
const FinalMessage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const messageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (messageRef.current) {
            observer.observe(messageRef.current);
        }

        return () => {
            if (messageRef.current) {
                observer.unobserve(messageRef.current);
            }
        };
    }, []);

    return (
        <div className="final-message">
            <div 
                ref={messageRef}
                className={`final-message-content ${isVisible ? 'visible' : ''}`}
            >
                <h2>You May Not Have Known...</h2>
                <p>
                    But every word of encouragement, every moment of recognition, 
                    and every instance where you believed in me created ripples 
                    that continue to this day.
                </p>
                <p>
                    Teachers like you, Ma'am, don't just teach subjects - you shape souls, 
                    build confidence, and create futures. The impact you've had 
                    on my life is immeasurable.
                </p>
                <p>
                    From 2017-2018 to now, the lessons haven't faded. 
                    They've grown, evolved, and become part of who I am.
                </p>
                <p>
                    On your birthday, I want you to know that your influence extends far 
                    beyond the classroom. You've touched lives in ways you may never fully 
                    realize, and mine is one of them.
                </p>
                <div className="signature">
                    With endless gratitude and warmest birthday wishes,<br />
                    Your Student (and your son's friend)
                </div>
            </div>
        </div>
    );
};

// Loading Component
const Loading = ({ isLoading }) => {
    return (
        <div className={`loading ${!isLoading ? 'fade-out' : ''}`}>
            <div className="loading-text">🎂 Preparing a special birthday message... 🎂</div>
        </div>
    );
};

// Main App Component
const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            <Loading isLoading={isLoading} />
            <div className="app">
                <Hero />
                
                <BirthdayWish />
                
                <StoryCard 
                    icon="👏" 
                    title="First Applause"
                    year="2017-2018"
                    className="applause"
                >
                    <p>
                        The English Club was more than just an activity - it was where I found my voice. 
                        When I received that <span className="highlight">first applause</span>, it wasn't 
                        just recognition; it was validation that what I had to say mattered.
                    </p>
                    <p>
                        You created an environment where students could flourish, and I was fortunate 
                        enough to be one of them. That moment of recognition planted a seed of 
                        confidence that would grow in ways I couldn't have imagined.
                    </p>
                </StoryCard>

                <StoryCard 
                    icon="👏" 
                    title="Second Applause"
                    year="2017-2018"
                    className="applause"
                >
                    <p>
                        The second time was different. It wasn't beginner's luck anymore - it was proof 
                        that the first time wasn't a fluke. You taught me that <span className="highlight">
                        consistency matters</span>, and that excellence is not an accident.
                    </p>
                    <p>
                        Each applause built upon the previous one, creating a foundation of self-belief 
                        that I carry with me to this day. You unknowingly taught me that recognition 
                        comes to those who persist and improve.
                    </p>
                </StoryCard>

                <StoryCard 
                    icon="🏆" 
                    title="The Award"
                    year="2017-2018"
                    className="award"
                >
                    <p>
                        This is where it gets interesting. I was supposed to <span className="highlight">
                        collect and give you money</span> that I had collected. The very next day, 
                        I received the award. The timing was serendipitous, almost magical.
                    </p>
                    <p>
                        What makes this even more special is that this was the <span className="highlight">
                        only time that award was ever distributed</span>. It was a unique moment in time, 
                        a convergence of circumstances that I could never have planned.
                    </p>
                    <p>
                        Looking back, it feels like the universe was acknowledging not just my efforts, 
                        but your influence on my growth. That award represents so much more than achievement - 
                        it represents the impact of great teaching.
                    </p>
                </StoryCard>

                <StoryCard 
                    icon="🎯" 
                    title="The Confidence Boost"
                    year="2017-2018"
                    className="confidence"
                >
                    <p>
                        One day, I came to your class while you were teaching Social Studies. I had to 
                        announce some names, and I did so with whatever confidence I had at that moment.
                    </p>
                    <p>
                        What you did next changed everything. You <span className="highlight">praised 
                        me for my confidence</span>. Those words didn't just acknowledge what was there - 
                        they amplified it. Your recognition made my confidence grow exponentially.
                    </p>
                    <p>
                        That's the power of a teacher's words. They don't just reflect reality; they 
                        shape it. Your praise became a self-fulfilling prophecy, pushing me to be even 
                        more confident, even more willing to speak up and take initiative.
                    </p>
                </StoryCard>

                <Timeline />

                <FriendshipConnection />

                <InteractiveThankYou />

                <StoryCard 
                    icon="💝" 
                    title="The Unknowing Impact"
                    className="gratitude"
                >
                    <p>
                        The beautiful thing about your influence, Ma'am, is that it was <span className="highlight">
                        unknowing</span>. You weren't trying to change my life or create a lasting impact. 
                        You were simply being an excellent teacher, doing what you do best.
                    </p>
                    <p>
                        You showed up every day, created opportunities for students to shine, offered 
                        genuine praise when warranted, and maintained an environment where growth was 
                        not just possible but inevitable.
                    </p>
                    <p>
                        The applause, the award, the confidence boost - these weren't isolated incidents. 
                        They were all manifestations of your consistent dedication to teaching and your 
                        genuine care for student development.
                    </p>
                    <p>
                        Years later, I realize that the greatest teachers often don't know the full extent 
                        of their impact. They plant seeds, water them with encouragement, and then trust 
                        the process. You did all of that for me, and I'm forever grateful.
                    </p>
                </StoryCard>

                <FinalMessage />
            </div>
        </>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
