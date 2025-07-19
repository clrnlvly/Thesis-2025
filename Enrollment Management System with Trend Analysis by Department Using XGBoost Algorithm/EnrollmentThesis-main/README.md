// Conditionally add "Curriculum Management" if the user is "accounting"
...(user.role === "accounting" ? [
{
title: "Curriculum Management",
url: "#",
icon: BookOpen,
items: [
{
title: "Program",
url: route("admin.program"),
},
{
title: "Subject",
url: route("admin.subject"),
},
{
title: "Curriculum",
url: route("admin.curriculum"),
},
{
title: "Section",
url: route("admin.section"),
},
],
},
] : []),
