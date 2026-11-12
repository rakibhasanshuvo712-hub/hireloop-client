export interface Job {
  id: string
  title: string
  company: string
  logo: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  category: "Design" | "Engineering" | "Product" | "Marketing" | "Operations"
  salary: string
  salaryMin: number
  salaryMax: number
  featured?: boolean
  postedAt: string
  experience: string
  workLevel: string
  deadline: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  companyOverview: {
    about: string
    industry: string
    size: string
    website: string
    location: string
  }
}

export interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  companyLogo: string
  applicantName: string
  applicantEmail: string
  applicantAvatar?: string
  appliedDate: string
  status: "Applied" | "Under Review" | "Shortlisted" | "Offered" | "Rejected"
  resumeUrl?: string
}

export interface Company {
  id: string
  name: string
  logo: string
  industry: string
  location: string
  size: string
  openJobsCount: number
  about: string
  status: "Approved" | "Pending" | "Rejected"
  recruiterEmail: string
  website: string
  dateSubmitted: string
}

export interface PlatformUser {
  id: string
  name: string
  email: string
  role: "Seeker" | "Recruiter" | "Admin"
  joinDate: string
  status: "Active" | "Suspended"
  avatar?: string
}

export interface PaymentTransaction {
  id: string
  userEmail: string
  userName: string
  plan: string
  amount: number
  date: string
  status: "Paid" | "Pending" | "Failed"
  paymentMethod: string
}

export const initialJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "Airbnb",
    logo: "/logos/airbnb.png",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    category: "Design",
    salary: "$140k - $185k",
    salaryMin: 140000,
    salaryMax: 185000,
    featured: true,
    postedAt: "2 days ago",
    experience: "5+ years",
    workLevel: "Senior Level",
    deadline: "Dec 30, 2026",
    description: "We are seeking a Senior Product Designer to define and elevate the end-to-end guest experience on Airbnb. You will partner with product managers, engineers, and researchers to design intuitive interfaces that empower millions of travelers worldwide.",
    responsibilities: [
      "Lead UX architecture and interface design from initial concept through production launch.",
      "Collaborate closely with cross-functional teams across engineering, research, and product strategy.",
      "Maintain, evolve, and advocate for the Airbnb design system components and guidelines.",
      "Conduct user research sessions, evaluate prototypes, and interpret qualitative feedback."
    ],
    requirements: [
      "5+ years of demonstrable product design experience in consumer-facing mobile or web apps.",
      "Mastery of Figma, interactive prototyping, and design systems architecture.",
      "Strong visual design skills with meticulous attention to micro-interactions and accessibility.",
      "Excellent communication and ability to present design rationales to executives."
    ],
    benefits: [
      "401(k) 6% Match",
      "Comprehensive Health & Dental",
      "Unlimited PTO",
      "$2,000 Annual Travel Credit",
      "Remote Work Stipend",
      "Parental Leave (16 Weeks)"
    ],
    companyOverview: {
      about: "Airbnb is a global community marketplace that connects hosts offering unique stays and experiences with travelers around the world.",
      industry: "Travel & Hospitality Tech",
      size: "6,000+ employees",
      website: "https://airbnb.com",
      location: "San Francisco, CA"
    }
  },
  {
    id: "job-2",
    title: "Lead Frontend Engineer",
    company: "Apple",
    logo: "/logos/apple.png",
    location: "Cupertino, CA (On-site)",
    type: "Full-time",
    category: "Engineering",
    salary: "$175k - $220k",
    salaryMin: 175000,
    salaryMax: 220000,
    featured: true,
    postedAt: "3 days ago",
    experience: "6+ years",
    workLevel: "Lead / Staff",
    deadline: "Jan 15, 2027",
    description: "Apple is looking for a Lead Frontend Engineer to architect high-performance web applications powering the next-generation Apple Developer portal and cloud tooling.",
    responsibilities: [
      "Architect and scale frontend micro-frontends using Next.js, React 19, and TypeScript.",
      "Optimize core web vitals, rendering pipeline performance, and cross-browser responsiveness.",
      "Mentor senior engineers and drive code review standards across multiple squads."
    ],
    requirements: [
      "6+ years of production frontend engineering experience with modern JavaScript / TypeScript.",
      "Deep understanding of web performance, browser internals, and CSS layout engines.",
      "Track record of delivering enterprise-scale frontend architectures."
    ],
    benefits: [
      "Apple Product Discounts",
      "Comprehensive Health Care",
      "Competitive RSU Equity Package",
      "401(k) Matching",
      "On-site Wellness Centers"
    ],
    companyOverview: {
      about: "Apple revolutionizes personal technology with groundbreaking consumer hardware, software platforms, and digital cloud services.",
      industry: "Consumer Electronics & Software",
      size: "160,000+ employees",
      website: "https://apple.com",
      location: "Cupertino, CA"
    }
  },
  {
    id: "job-3",
    title: "AI Research Scientist",
    company: "Google",
    logo: "/logos/google.png",
    location: "Mountain View, CA (Remote)",
    type: "Remote",
    category: "Engineering",
    salary: "$210k - $280k",
    salaryMin: 210000,
    salaryMax: 280000,
    featured: true,
    postedAt: "1 day ago",
    experience: "4+ years",
    workLevel: "Staff Level",
    deadline: "Dec 20, 2026",
    description: "Join the Google DeepMind core research team working on large language model alignment, multimodal reasoning architectures, and next-generation agentic workflows.",
    responsibilities: [
      "Design, train, and benchmark foundational multimodal foundation models.",
      "Publish high-impact peer-reviewed research papers at NeurIPS, ICML, and ICLR.",
      "Collaborate with production teams to deploy state-of-the-art models safely at global scale."
    ],
    requirements: [
      "Ph.D. or equivalent industry experience in Computer Science, Machine Learning, or Mathematics.",
      "Extensive experience with PyTorch, JAX, distributed GPU/TPU training clusters.",
      "Publication track record in top tier machine learning venues."
    ],
    benefits: [
      "Top-tier Base + Significant Stock Grants",
      "25 Days PTO + Paid Sabbatical",
      "Free Gourmet On-Campus Meals",
      "Comprehensive Family Health Coverage"
    ],
    companyOverview: {
      about: "Google's mission is to organize the world's information and make it universally accessible and useful.",
      industry: "Artificial Intelligence & Search",
      size: "180,000+ employees",
      website: "https://google.com",
      location: "Mountain View, CA"
    }
  },
  {
    id: "job-4",
    title: "Principal Product Manager",
    company: "Netflix",
    logo: "/logos/netflix.png",
    location: "Los Gatos, CA",
    type: "Full-time",
    category: "Product",
    salary: "$190k - $250k",
    salaryMin: 190000,
    salaryMax: 250000,
    featured: false,
    postedAt: "5 days ago",
    experience: "7+ years",
    workLevel: "Principal",
    deadline: "Jan 10, 2027",
    description: "Lead product strategy for streaming algorithms, adaptive video streaming protocols, and personalized member discovery experiences.",
    responsibilities: [
      "Define product roadmaps and KPIs for streaming playback experience.",
      "Analyze behavioral metrics, retention cohorts, and A/B test experiments at massive scale.",
      "Align business stakeholders and global content teams around member engagement."
    ],
    requirements: [
      "Proven product leadership experience scaling consumer subscription streaming services.",
      "High data literacy and expertise in rigorous statistical experimentation.",
      "Demonstrated ability to inspire high-performing engineering teams."
    ],
    benefits: [
      "All-Cash Compensation Model",
      "Flexible Open Vacation Policy",
      "Comprehensive Family Medical & Mental Health",
      "Stock Option Purchase Plan"
    ],
    companyOverview: {
      about: "Netflix is the world's leading entertainment service with 270+ million paid memberships enjoying TV series, documentaries, and films.",
      industry: "Entertainment & Media Streaming",
      size: "13,000+ employees",
      website: "https://netflix.com",
      location: "Los Gatos, CA"
    }
  },
  {
    id: "job-5",
    title: "Senior Cloud DevOps Engineer",
    company: "Amazon",
    logo: "/logos/amazon.png",
    location: "Seattle, WA (Hybrid)",
    type: "Full-time",
    category: "Engineering",
    salary: "$155k - $195k",
    salaryMin: 155000,
    salaryMax: 195000,
    featured: false,
    postedAt: "4 days ago",
    experience: "4+ years",
    workLevel: "Senior Level",
    deadline: "Jan 25, 2027",
    description: "Help architect and manage automated multi-region Kubernetes clusters, CI/CD deployment pipelines, and high-availability AWS infrastructure.",
    responsibilities: [
      "Automate infrastructure provisioning via Terraform, Helm, and AWS CDK.",
      "Enhance observability using Prometheus, Grafana, OpenTelemetry, and CloudWatch.",
      "Participate in 24/7 on-call rotations and lead post-incident retrospectives."
    ],
    requirements: [
      "Strong hands-on experience with Kubernetes, Docker, and AWS enterprise architecture.",
      "Proficiency in Go, Python, or Bash scripting for automation tooling.",
      "Familiarity with zero-trust security and compliance frameworks."
    ],
    benefits: [
      "Amazon RSU Package",
      "Comprehensive Medical/Dental/Vision",
      "Career Choice Tuition Assistance",
      "Parental Leave"
    ],
    companyOverview: {
      about: "Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.",
      industry: "Cloud Computing & E-Commerce",
      size: "1,500,000+ employees",
      website: "https://amazon.com",
      location: "Seattle, WA"
    }
  },
  {
    id: "job-6",
    title: "Growth Marketing Director",
    company: "Spotify",
    logo: "/logos/spotify.png",
    location: "New York, NY (Remote)",
    type: "Remote",
    category: "Marketing",
    salary: "$145k - $180k",
    salaryMin: 145000,
    salaryMax: 180000,
    featured: false,
    postedAt: "6 days ago",
    experience: "5+ years",
    workLevel: "Director",
    deadline: "Feb 01, 2027",
    description: "Drive paid user acquisition, international growth campaigns, and creator partnership funnels for Spotify's podcast and audiobook platforms.",
    responsibilities: [
      "Manage multimillion-dollar performance marketing budgets across global channels.",
      "Develop attribution modeling and retention lifecycle communications.",
      "Coordinate with content creators and artist label marketing partners."
    ],
    requirements: [
      "5+ years scaling consumer mobile subscription acquisition programs.",
      "Analytical mindset with hands-on proficiency in SQL, Tableau, and AppsFlyer.",
      "Passionate about audio, podcasts, and digital culture."
    ],
    benefits: [
      "Flexible Work From Anywhere Policy",
      "Spotify Premium Subscription",
      "Annual Learning & Wellness Allowance",
      "Global Health Insurance"
    ],
    companyOverview: {
      about: "Spotify transformed music listening forever when it launched in 2008. Today, it is the world's most popular audio streaming subscription service.",
      industry: "Audio & Music Tech",
      size: "9,000+ employees",
      website: "https://spotify.com",
      location: "New York, NY"
    }
  },
  {
    id: "job-7",
    title: "Autonomous Driving Systems Engineer",
    company: "Tesla",
    logo: "/logos/tesla.png",
    location: "Austin, TX (On-site)",
    type: "Full-time",
    category: "Engineering",
    salary: "$165k - $215k",
    salaryMin: 165000,
    salaryMax: 215000,
    featured: true,
    postedAt: "1 week ago",
    experience: "4+ years",
    workLevel: "Senior Level",
    deadline: "Feb 15, 2027",
    description: "Develop safety-critical real-time software systems powering Tesla Full Self-Driving (FSD) neural network inference engines.",
    responsibilities: [
      "Write high-throughput, low-latency C++20 algorithms for embedded vehicle hardware.",
      "Implement hardware-in-the-loop validation suites and synthetic sensor simulation.",
      "Optimize vision-based occupancy network pipelines on custom silicon."
    ],
    requirements: [
      "Extensive experience in modern C++, RTOS, Linux kernel, and CUDA.",
      "Understanding of robotics kinematics, sensor fusion, or computer vision.",
      "Track record of building safety-critical production systems."
    ],
    benefits: [
      "Generous Tesla Equity Grant",
      "Full Health Coverage",
      "401(k) Match",
      "Employee Vehicle Discounts"
    ],
    companyOverview: {
      about: "Tesla accelerates the world's transition to sustainable energy with electric vehicles, energy storage, and AI robotics.",
      industry: "Automotive & Clean Energy AI",
      size: "140,000+ employees",
      website: "https://tesla.com",
      location: "Austin, TX"
    }
  },
  {
    id: "job-8",
    title: "Senior UI/UX Designer",
    company: "Meta",
    logo: "/logos/meta.png",
    location: "Menlo Park, CA (Hybrid)",
    type: "Full-time",
    category: "Design",
    salary: "$150k - $190k",
    salaryMin: 150000,
    salaryMax: 190000,
    featured: false,
    postedAt: "1 week ago",
    experience: "4+ years",
    workLevel: "Senior Level",
    deadline: "Feb 20, 2027",
    description: "Design social connection surfaces and immersive AR/VR spatial interaction models across Meta's family of applications.",
    responsibilities: [
      "Create high-fidelity wireframes, UI flows, and micro-interactions.",
      "Test spatial interface prototypes with usability test groups.",
      "Work alongside 3D artists and graphics engineers."
    ],
    requirements: [
      "4+ years designing interactive mobile and responsive web applications.",
      "Familiarity with spatial design, Unity, or 3D prototyping tools is a plus.",
      "Strong portfolio demonstrating systems design thinking."
    ],
    benefits: [
      "Meta Equity (RSU) Grants",
      "Free Daily On-Site Meals",
      "Wellness Stipends ($3,000/yr)",
      "Comprehensive Health & Dental Coverage"
    ],
    companyOverview: {
      about: "Meta builds technologies that help people connect, find communities, and grow businesses.",
      industry: "Social Media & Spatial Computing",
      size: "67,000+ employees",
      website: "https://meta.com",
      location: "Menlo Park, CA"
    }
  }
]

export const initialCompanies: Company[] = [
  {
    id: "comp-1",
    name: "Airbnb",
    logo: "/logos/airbnb.png",
    industry: "Travel Tech",
    location: "San Francisco, CA",
    size: "6,000+",
    openJobsCount: 14,
    about: "Connecting millions of guests and hosts worldwide through unique travel experiences.",
    status: "Approved",
    recruiterEmail: "recruiter@airbnb.com",
    website: "https://airbnb.com",
    dateSubmitted: "2026-09-12"
  },
  {
    id: "comp-2",
    name: "Apple",
    logo: "/logos/apple.png",
    industry: "Consumer Tech",
    location: "Cupertino, CA",
    size: "160,000+",
    openJobsCount: 38,
    about: "Innovating hardware, software, and services that empower creative thinkers.",
    status: "Approved",
    recruiterEmail: "careers@apple.com",
    website: "https://apple.com",
    dateSubmitted: "2026-08-20"
  },
  {
    id: "comp-3",
    name: "Google",
    logo: "/logos/google.png",
    industry: "AI & Search",
    location: "Mountain View, CA",
    size: "180,000+",
    openJobsCount: 42,
    about: "Building AI, cloud, and computing platforms for everyone across the globe.",
    status: "Approved",
    recruiterEmail: "talent@google.com",
    website: "https://google.com",
    dateSubmitted: "2026-07-15"
  },
  {
    id: "comp-4",
    name: "Netflix",
    logo: "/logos/netflix.png",
    industry: "Entertainment",
    location: "Los Gatos, CA",
    size: "13,000+",
    openJobsCount: 9,
    about: "Entertaining the world with award-winning storytelling and streaming innovation.",
    status: "Approved",
    recruiterEmail: "jobs@netflix.com",
    website: "https://netflix.com",
    dateSubmitted: "2026-09-01"
  },
  {
    id: "comp-5",
    name: "Amazon",
    logo: "/logos/amazon.png",
    industry: "Cloud & E-Commerce",
    location: "Seattle, WA",
    size: "1,500,000+",
    openJobsCount: 52,
    about: "Pioneering customer obsession and global cloud infrastructure with AWS.",
    status: "Approved",
    recruiterEmail: "recruiting@amazon.com",
    website: "https://amazon.com",
    dateSubmitted: "2026-06-18"
  },
  {
    id: "comp-6",
    name: "Spotify",
    logo: "/logos/spotify.png",
    industry: "Audio & Streaming",
    location: "New York, NY",
    size: "9,000+",
    openJobsCount: 12,
    about: "Connecting millions of creators with billions of fans through sound.",
    status: "Approved",
    recruiterEmail: "talent@spotify.com",
    website: "https://spotify.com",
    dateSubmitted: "2026-09-22"
  },
  {
    id: "comp-7",
    name: "Tesla",
    logo: "/logos/tesla.png",
    industry: "Automotive & Energy",
    location: "Austin, TX",
    size: "140,000+",
    openJobsCount: 25,
    about: "Accelerating the world's transition to sustainable energy and autonomous robotics.",
    status: "Approved",
    recruiterEmail: "jobs@tesla.com",
    website: "https://tesla.com",
    dateSubmitted: "2026-08-30"
  },
  {
    id: "comp-8",
    name: "Meta",
    logo: "/logos/meta.png",
    industry: "Social Tech & AI",
    location: "Menlo Park, CA",
    size: "67,000+",
    openJobsCount: 30,
    about: "Giving people the power to build community and bring the world closer together.",
    status: "Approved",
    recruiterEmail: "careers@meta.com",
    website: "https://meta.com",
    dateSubmitted: "2026-07-29"
  },
  {
    id: "comp-9",
    name: "Quantum Dynamics (Pending)",
    logo: "/logos/nvidia.png",
    industry: "Quantum Computing",
    location: "Boston, MA",
    size: "120+",
    openJobsCount: 4,
    about: "Next-generation quantum simulation algorithms for drug discovery.",
    status: "Pending",
    recruiterEmail: "hr@quantumdynamics.io",
    website: "https://quantumdynamics.io",
    dateSubmitted: "2026-11-10"
  }
]

export const initialApplications: Application[] = [
  {
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Product Designer",
    company: "Airbnb",
    companyLogo: "/logos/airbnb.png",
    applicantName: "Alex Rivera",
    applicantEmail: "alex.rivera@example.com",
    applicantAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    appliedDate: "2 days ago",
    status: "Under Review",
    resumeUrl: "#"
  },
  {
    id: "app-2",
    jobId: "job-2",
    jobTitle: "Lead Frontend Engineer",
    company: "Apple",
    companyLogo: "/logos/apple.png",
    applicantName: "Jordan Hayes",
    applicantEmail: "jordan.hayes@example.com",
    applicantAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    appliedDate: "5 days ago",
    status: "Shortlisted",
    resumeUrl: "#"
  },
  {
    id: "app-3",
    jobId: "job-3",
    jobTitle: "AI Research Scientist",
    company: "Google",
    companyLogo: "/logos/google.png",
    applicantName: "Dr. Elena Rostova",
    applicantEmail: "elena.rostova@example.com",
    applicantAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    appliedDate: "1 week ago",
    status: "Offered",
    resumeUrl: "#"
  },
  {
    id: "app-4",
    jobId: "job-4",
    jobTitle: "Principal Product Manager",
    company: "Netflix",
    companyLogo: "/logos/netflix.png",
    applicantName: "Marcus Vance",
    applicantEmail: "marcus.vance@example.com",
    applicantAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    appliedDate: "2 weeks ago",
    status: "Applied",
    resumeUrl: "#"
  },
  {
    id: "app-5",
    jobId: "job-5",
    jobTitle: "Senior Cloud DevOps Engineer",
    company: "Amazon",
    companyLogo: "/logos/amazon.png",
    applicantName: "Sarah Chen",
    applicantEmail: "sarah.chen@example.com",
    applicantAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    appliedDate: "3 weeks ago",
    status: "Rejected",
    resumeUrl: "#"
  }
]

export const initialUsers: PlatformUser[] = [
  {
    id: "usr-1",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "Seeker",
    joinDate: "May 14, 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-2",
    name: "Sarah Chen",
    email: "sarah.chen@airbnb.com",
    role: "Recruiter",
    joinDate: "Apr 22, 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-3",
    name: "Jordan Hayes",
    email: "jordan.hayes@example.com",
    role: "Seeker",
    joinDate: "Jun 01, 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-4",
    name: "David Kim",
    email: "david.kim@google.com",
    role: "Recruiter",
    joinDate: "Mar 11, 2026",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-5",
    name: "HireLoop Admin",
    email: "admin@hireloop.io",
    role: "Admin",
    joinDate: "Jan 01, 2026",
    status: "Active"
  }
]

export const initialTransactions: PaymentTransaction[] = [
  {
    id: "tx_98a72b14c",
    userEmail: "alex.rivera@example.com",
    userName: "Alex Rivera",
    plan: "Seeker Pro ($19/mo)",
    amount: 19.00,
    date: "May 10, 2026 · 9 days ago",
    status: "Paid",
    paymentMethod: "Visa •••• 4242"
  },
  {
    id: "tx_65c31f90a",
    userEmail: "sarah.chen@airbnb.com",
    userName: "Sarah Chen (Airbnb)",
    plan: "Recruiter Enterprise ($149/mo)",
    amount: 149.00,
    date: "May 08, 2026 · 11 days ago",
    status: "Paid",
    paymentMethod: "Mastercard •••• 8821"
  },
  {
    id: "tx_22d90e44b",
    userEmail: "recruiting@amazon.com",
    userName: "Amazon Recruiter",
    plan: "Recruiter Growth ($49/mo)",
    amount: 49.00,
    date: "May 05, 2026 · 14 days ago",
    status: "Paid",
    paymentMethod: "Amex •••• 3004"
  },
  {
    id: "tx_11b88e12d",
    userEmail: "jordan.hayes@example.com",
    userName: "Jordan Hayes",
    plan: "Seeker Premium ($39/mo)",
    amount: 39.00,
    date: "Apr 28, 2026 · 21 days ago",
    status: "Paid",
    paymentMethod: "Visa •••• 1029"
  }
]
