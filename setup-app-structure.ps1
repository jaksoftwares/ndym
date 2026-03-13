# Ensure all directories exist first
$folders = @(
    "app/(auth)/login",
    "app/(auth)/register",

    "app/admin/dashboard",
    "app/admin/youth",
    "app/admin/youth/[id]",
    "app/admin/churches",
    "app/admin/parishes",
    "app/admin/deaneries",
    "app/admin/archdeaconries",
    "app/admin/admins",

    "app/register",

    "app/api/youth",
    "app/api/upload",
    "app/api/auth",

    "components/forms",
    "components/dashboard",
    "components/ui",
    "components/layout",

    "lib/supabase",
    "lib/cloudinary",
    "lib/auth",

    "types"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
        Write-Host "Created folder: $folder"
    }
}

# Now create files (parent directories already exist)
$files = @(
    "app/(auth)/login/page.tsx",
    "app/(auth)/register/page.tsx",

    "app/admin/dashboard/page.tsx",
    "app/admin/youth/page.tsx",
    "app/admin/youth/[id]/page.tsx",
    "app/admin/churches/page.tsx",
    "app/admin/parishes/page.tsx",
    "app/admin/deaneries/page.tsx",
    "app/admin/archdeaconries/page.tsx",
    "app/admin/admins/page.tsx",

    "app/register/page.tsx",

    "app/api/youth/route.ts",
    "app/api/upload/route.ts",
    "app/api/auth/route.ts",

    "app/layout.tsx",
    "app/page.tsx",

    "components/forms/youth-form.tsx",
    "components/dashboard/stats.tsx",
    "components/dashboard/charts.tsx",
    "components/ui/button.tsx",
    "components/ui/card.tsx",
    "components/ui/modal.tsx",
    "components/layout/sidebar.tsx",
    "components/layout/header.tsx",

    "lib/supabase/client.ts",
    "lib/supabase/server.ts",
    "lib/cloudinary/config.ts",
    "lib/auth/roles.ts",
    "lib/utils.ts",

    "types/youth.ts",
    "types/church.ts",
    "types/user.ts",

    "middleware.ts"
)

foreach ($file in $files) {
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file | Out-Null
        Write-Host "Created file: $file"
    }
}