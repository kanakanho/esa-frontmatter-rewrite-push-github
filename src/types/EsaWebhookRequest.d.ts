// Reference https://docs.esa.io/posts/37

export type PostCreate = {
  kind: "post_create";
  team: {
    name: string;
  };
  post: {
    name: string;
    body_md: string;
    body_html: string;
    message: string;
    wip: boolean;
    number: number;
    url: string;
  };
  user: {
    icon: {
      url: string;
      thumb_s: {
        url: string;
      };
      thumb_ms: {
        url: string;
      };
      thumb_m: {
        url: string;
      };
      thumb_l: {
        url: string;
      };
    };
    name: string;
    screen_name: string;
  };
};

export type PostUpdate = {
  kind: "post_update";
  team: {
    name: string;
  };
  post: {
    name: string;
    body_md: string;
    body_html: string;
    message: string;
    wip: boolean;
    number: number;
    url: string;
    diff_url: string;
  };
  user: {
    icon: {
      url: string;
      thumb_s: {
        url: string;
      };
      thumb_ms: {
        url: string;
      };
      thumb_m: {
        url: string;
      };
      thumb_l: {
        url: string;
      };
    };
    name: string;
    screen_name: string;
  };
};

export type PostArchive = {
  kind: "post_archive";
  team: {
    name: string;
  };
  post: {
    name: string;
    body_md: string;
    body_html: string;
    message: string;
    wip: boolean;
    number: number;
    url: string;
  };
  user: {
    icon: {
      url: string;
      thumb_s: {
        url: string;
      };
      thumb_ms: {
        url: string;
      };
      thumb_m: {
        url: string;
      };
      thumb_l: {
        url: string;
      };
    };
    name: string;
    screen_name: string;
  };
};

export type PostDelete = {
  kind: "post_delete";
  team: {
    name: string;
  };
  post: {
    name: string;
    wip: boolean;
    number: number;
  };
  user: {
    icon: {
      url: string;
      thumb_s: {
        url: string;
      };
      thumb_ms: {
        url: string;
      };
      thumb_m: {
        url: string;
      };
      thumb_l: {
        url: string;
      };
    };
    name: string;
    screen_name: string;
  };
};

export type Request = {
  kind: "post_create" | "post_update" | "post_archive" | "post_delete";
  team: {
    name: string;
  };
  post: {
    name: string;
    body_md?: string;
    body_html?: string;
    message?: string;
    wip: boolean;
    number: number;
    url?: string;
    diff_url?: string;
  };
  user: {
    icon: {
      url: string;
      thumb_s: {
        url: string;
      };
      thumb_ms: {
        url: string;
      };
      thumb_m: {
        url: string;
      };
      thumb_l: {
        url: string;
      };
    };
    name: string;
    screen_name: string;
  };
};
