
import { Dashboard } from "./dashboard/dashboard";
import { Profile } from "./profile/profile";
import { AcceptedCampaigns } from "./accepted-campaigns/accepted-campaigns";
import { BrowseCampaigns } from "./browse-campaigns/browse-campaigns";
import { MyApplications } from "./my-applications/my-applications";
import { Routes } from "@angular/router";
import { InfluencerLayout } from "./influencer-layout/influencer-layout";
import { InfluencerAiScout } from "./ai-scout/ai-scout";

export const INFLUENCER_ROUTES : Routes =[

    {
        path:'',
        component: InfluencerLayout,
        children:[
            {path:'dashboard', component:Dashboard},
            {path:'profile', component:Profile},
            {path:'accepted-campaigns', component:AcceptedCampaigns},
            {path:'browse-campaigns', component:BrowseCampaigns},
            {path:'my-applications', component:MyApplications},
            {path:'ai-scout', component:InfluencerAiScout},
            {path:'', redirectTo:'dashboard', pathMatch:'full'},
            
        ],
    },
];