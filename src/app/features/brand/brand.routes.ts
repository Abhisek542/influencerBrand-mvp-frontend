import { Routes } from "@angular/router";
import { BrandLayout } from "./brand-layout/brand-layout";
import { CampaignApplications } from "./campaign-applications/campaign-applications";
import { CreateCampaign } from "./create-campaign/create-campaign";
import { Dashboard } from "./dashboard/dashboard";
import { MyCampaigns } from "./my-campaigns/my-campaigns";
import { Profile } from "./profile/profile";

export const BRAND_ROUTES : Routes =[

    {
     path:'',
     component: BrandLayout,
        children:[
            {path:'dashboard',component:Dashboard},
            {path:'profile',component:Profile},
            {path:'campaigns/:id/applications',component:CampaignApplications},
            {path:'campaigns/create',component:CreateCampaign},
            {path:'campaigns',component:MyCampaigns},
            {path:'', redirectTo:'dashboard', pathMatch:'full'},


        ],
    },
];