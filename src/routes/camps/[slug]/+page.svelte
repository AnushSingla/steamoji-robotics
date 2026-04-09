<script lang="ts">
    import { page } from '$app/state';
    import GlassPanel from '$lib/components/GlassPanel.svelte';
    import { Button } from '$lib/components/ui/button';
    import { ArrowLeft, CheckCircle2, Calendar, Goal, Trophy, Icon, Car, Pointer, Check } from '@lucide/svelte';
	

    const slug = $derived(page.params.slug);
    
    // We use .toUpperCase() for the heading, but we check the slug for the logic
    const displayTitle = $derived(slug.replace(/-/g, ' ').toUpperCase());

    // Define the lists here so the HTML stays clean
    const iqHighlights = [
        {
        details:[
        "Movement & Mobility Mastery",
        "Scoring Systems Engineering",
        "Python Programming & Autonomous Strategy",
        "Skill focused camp"
        ],
        final: "Each week builds intentionally upon the previous week, guiding students from mechanical fundamentals to integrated competitive execution.",
        stripe:"https://buy.stripe.com/3cI7sL7Nh7cEfSW3SP0Jq00"
        }
    ];

    const v5Highlights = [
        {
            details:[
         "Modular C++ Codebase (PROS)",
        "Structurally Optimized Robot",
        "Autonomous Routines Tested",
        "Clear Team Role Clarity"
            ],
            final: "Over three progressive weeks, students move from strategy and mechanical architecture to precision engineering and advanced autonomous programming.",
            stripe:"https://buy.stripe.com/3cI7sL7Nh7cEfSW3SP0Jq00"
        }
       
    ];
    const isV5 = $derived(slug.toLowerCase().includes('v5'));
    const isIQ = $derived(slug.toLowerCase().includes('iq'));
    const iqSchedule = [
        {
            week: "Week 1",
            desc: "Students analyze the annual VEX IQ game and study how scoring cycles depend on efficient navigation. They evaluate how drivetrain choices influence speed, control, maneuverability, and defensive positioning",
            title: "Competitive Drivetrain & Mobility",
            details: ["Compare drive configurations", "Explore gear ratios and torque trade-offs", "Understand weight distribution & stability", "Conduct timed driving drills and precision control" , "Build and refine a structured competition-ready chasis" , "Evaluate drivetrain decisions based on game objectives"],
            end1:"", end2:""
        },
        {
            week: "Week 2",
            desc: "Week 2 develops students’ understanding of mechanism design and efficiency. Students explore how robots intake, lift, stack, and manipulate game elements.",
            title: "Scoring Systems & Optimization",
            details: ["Mechanical leverage & load management", "Structural reinforcement techniques", "Bracing & failure prevention", "Iterative redesign through structured testing"],
            end1:"", end2:""
        },
        {
            week: "Week 3",
            desc: "Students transition into structured Python programming within the VEX IQ environment. Rather than relying solely on drag-and-drop logic, they begin developing text-based programming discipline.",
            title: "Python & Autonomous Strategy",
            details: ["Variables, loops, and conditional logic", "Modular function design", "Sensor-based decision making", "Autonomous sequencing", "Debugging methodology" , "Timing optimization"],
            end1:"Beyond mechanics of coding, students analyze autonomous strategy. They study how early-match positioning creates scoring advantages and how autonomous routines must be consistent and repeatable." ,
            end2: "Students design and implement their own autonomous routines, testing them from both sides of the field to account for variation."
        }
    ];

    const v5Schedule = [
        {
            week: "Week 1",
            desc: "Students analyze the official VRC game in depth, breaking down scoring cycles, field constraints, and win conditions. They identify required mechanisms, drivetrain demands, and match tempo.",
            title: "Strategic Architecture & C++",
            details: ["VRC game analysis", "Motor stacking & gear ratios", "Wiring & electronics", "C++ foundation building"],
            end1:"", end2:""
        },
        {
            week: "Week 2",
            desc: "In Week 2, students transition from prototype builders to competitive engineers. Using professional CAD tools (Fusion or Onshape), students redesign subsystems digitally before rebuilding physically. They learn to engineer with precision rather than intuition.",
            title: "Engineering & CAD Optimization",
            details: ["Fusion/Onshape digital design", "Power transfer optimization", "Material selection constraints", "Stress-testing mechanisms"],
            end1:"", end2:""
        },
        {
            week: "Week 3",
            desc: "Week 3 elevates students into advanced robotics software engineering. Students install and configure PROS, develop modular C++ codebases, and program subsystems with professional structure.",
            title: "Advanced Systems & PID",
            details: ["PID control & Odometry", "Sensor fusion algorithms", "Autonomous routine planning", "2v2 ranked match simulation"],
            end1:"Students design and implement complete autonomous routines, test consistency on both field sides, and refine based on variance and error margins.", 
            end2:"Students experience the pace, pressure, and discipline required at official VEX events."
        }
    ];
    const iqWhy = [
        {   title:"Why a Pre-Season Competitive prep for VEX IQ?",
            what : "The Steamoji VEX IQ Pre-Season robotics bootcamp is a focused three-week training experience designed to prepare elementary and early middle school students for serious competitive participation.",
            points:["Mechanical Understanding" , "Strategic Thinking" ,  "Structured Programming Habits" , "Professional Teamwork standards"],
            result: "Students who complete this bootcamp enter the fall season with clarity, confidence, and a disciplined engineering mindset."
        }
    ];
    const v5Why = [
        {   title: "Why a Pre-Season Competitive Prep for VEX V5?",
            what:"The Steamoji VEX V5 Pre-Season Robotics bootcamp is a structured three-week immersion designed to prepare serious students for high-level competition performance. ",
            points:[],
            result: "Students experience the pace, pressure, and discipline required at official VEX events.They begin the season ahead — not behind."
        }
    ]
    const iqcul = [
        {
            details:[
      "Timed autonomous challenges",
      "Driver skills runs",
      "Structured mini scrimmages",
      "Judging-style presentation practice",
      ],
      text:""
        }
    ];
    const v5cul = [
        {
            details:[ 
                "Skills runs",
                "Judged Interviews" ,
                "2v2  ranked matches " ,
                "Rapid Iteration cycles",
                
            ],
            text: "Students experience the pace, pressure, and discipline required at official VEX events."
        }
    ];
   const iqOutcome = [
  {
    details: [
      "Strong mechanical understanding",
      "Improved driver control and strategic awareness",
      "Foundational Python programming proficiency",
      "Structured autonomous routines",
      "Confidence in judging interviews",
      "Clear understanding of team roles"
    ]
  }
];

const v5Outcome = [
  {
    details: [
      "A strategic understanding of the game",
      "A structurally optimized robot",
      "A modular C++ codebase",
      "Autonomous routines already tested",
      "Competition simulation experience",
      "Clear role clarity (builder, programmer, strategist, driver)"
    ]
  }
];



    const currentSchedule = $derived(isV5 ? v5Schedule : iqSchedule);
     const outcome = $derived(isV5 ? v5Outcome : iqOutcome);
     const framework = $derived(isV5 ? v5Highlights : iqHighlights);
     const why = $derived(isV5 ? v5Why : iqWhy);
     const culmination = $derived(isV5 ? v5cul : iqcul);
     const stripeLink = $derived(isV5 ? v5Highlights[0].stripe : iqHighlights[0].stripe);

   

    
   
</script>

<svelte:head>
    <title>{displayTitle} | Steamoji Robotics</title>
</svelte:head>

<div class="min-h-screen pt-32 pb-20 px-6">
    <div class="max-w-4xl mx-auto">
        <a href="/camps" class="inline-flex items-center text-yellow-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft class="w-5 h-5 mr-2" /> Back to All Camps
        </a>

        <GlassPanel class="p-12">
            <h1 class="text-4xl md:text-6xl font-display text-white mb-8 leading-tight">
                <span class="text-yellow-400">{displayTitle}</span>
            </h1>
             <p>
                    Welcome to the camp page for the <strong>{displayTitle}</strong>. 
                    This program is specifically designed to provide students with 
                    hands-on experience in cutting-edge robotics technology.
                </p>
                <br>
            <div class="space-y-8">
                    
                    
                    <div class="space-y-8">
                        {#each why as item}
                        <h2 class="text-2xl font-display text-white flex items-center gap-2">
                        <Pointer class="text-red-400" />{item.title}
                        </h2>
                            <div class="relative pl-8 border-l-2 border-yellow-400/30">
                                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]"></div>
                                
                                <div class="mb-2">
                                    
                                    
                                </div>
                                <div class = "mb-2">
                                    <p>{item.what}</p>
                                </div>
                                
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                    {#each item.points as point}
                                        <li class="text-m text-white/70 flex items-center gap-2">
                                            <span class="w-1 h-1 bg-white/30 rounded-full"></span>
                                            {point}
                                        </li>
                                    {/each}
                                </ul>
                                <br>
                               
                                 <h3>{item.result}</h3>
                                 <br>
                            </div>
                             
                              
                                
                                
                        {/each}
                        
                    </div>
                </div>
                <br>

            <div class="space-y-8 text-white/80 text-lg leading-relaxed">
                 {#each framework as item}
               

                {#if isIQ || isV5}
                    <h2 class="text-2xl font-display text-white flex items-center gap-2">
                    <Goal class="text-red-400"/> Bootcamp Framework
                    </h2>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {#each item.details as detail}
                            <li class="flex items-center gap-3">
                                <CheckCircle2 class=" text-yellow-400 w-6 h-6 flex-shrink-0" />
                                <span>{detail}</span>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <p class="italic text-white/40 text-sm">Details for this specific camp are being updated.</p>
                {/if}
                <h2 class="text-md font-display text-white flex items-center gap-2">
                       {item.final}
                </h2>
                {/each}

            </div>
            <br><br>
            <div class="space-y-8">
                    <h2 class="text-2xl font-display text-white flex items-center gap-2">
                        <Calendar class="text-red-400" /> Bootcamp Schedule
                    </h2>
                    
                    <div class="space-y-8">
                        {#each currentSchedule as item}
                            <div class="relative pl-8 border-l-2 border-yellow-400/30">
                                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]"></div>
                                
                                <div class="mb-2">
                                    <span class="text-red-400 font-bold text-sm uppercase tracking-widest">{item.week}</span>
                                    <h3 class="text-xl font-bold text-white">{item.title}</h3>
                                </div>
                                <div class = "mb-2">
                                    <p>{item.desc}</p>
                                </div>
                                
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                    {#each item.details as detail}
                                        <li class="text-m text-white/70 flex items-center gap-2">
                                            <span class="w-1 h-1 bg-white/30 rounded-full"></span>
                                            {detail}
                                        </li>
                                    {/each}
                                </ul>
                               <br>
                            </div>
                             
                                <h3>{item.end1}</h3>
                                
                                <h3>{item.end2}</h3>
                        {/each}
                        
                    </div>
                </div>
                <br><br>
                 <div class="space-y-8">
                    <h2 class="text-2xl font-display text-white flex items-center gap-2">
                        <Check class="text-red-400" /> Bootcamp Culmination
                    </h2>
                    
                    <div class="space-y-8">
                        {#each culmination as item}
                            <div class="relative pl-8 border-l-2 border-yellow-400/30">
                                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]"></div>
                                
                                
                                
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                    {#each item.details as detail}
                                        <li class="text-m text-white/70 flex items-center gap-2">
                                            <span class="w-1 h-1 bg-white/30 rounded-full"></span>
                                            {detail}
                                        </li>
                                    {/each}
                                </ul>
                                
                                 
                            </div>
                            
                        {/each}
                    </div>
                </div>
                <br>
                 <div class="space-y-8">
                    <h2 class="text-2xl font-display text-white flex items-center gap-2">
                        <Trophy class="text-red-400" /> Bootcamp Outcomes
                    </h2>
                    
                    <div class="space-y-8">
                        {#each outcome as item}
                            <div class="relative pl-8 border-l-2 border-yellow-400/30">
                                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]"></div>
                                
                                
                                
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                                    {#each item.details as detail}
                                        <li class="text-m text-white/70 flex items-center gap-2">
                                            <span class="w-1 h-1 bg-white/30 rounded-full"></span>
                                            {detail}
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/each}
                    </div>
                </div>
            
            
             
            
            <div class="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-white/60">Ready to start your journey?</p>
                
                <Button href={stripeLink} class="bg-yellow-400 text-black px-10 py-6 text-xl font-bold rounded-full">
                    Join This Camp
                </Button>
               
            </div>
        </GlassPanel>
    </div>
</div>