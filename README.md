# Uncover

> Demo app using Hasura Remote Joins - [Preview](https://uncover.now.sh)

Please refer to the article for more information.

### Hasura

A migrations folder is included here. You can apply this with the Hasura CLI, or copy and paste in the SQL contents into hasura manually. You will also need to import the `metadata.json` file into Hasura (Settings > Import/Export > Import Metadata).

```sql
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    auth0_id text,
    email text NOT NULL,
    profile_id uuid
);
CREATE TABLE public.users_profiles (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username text NOT NULL
);
CREATE TABLE public.images (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "altText" text,
    url text NOT NULL
);
CREATE TABLE public.images_comments (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    image_id uuid NOT NULL,
    user_id text NOT NULL,
    comment text NOT NULL
);
ALTER TABLE ONLY public.images_comments
    ADD CONSTRAINT images_comments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_auth0_id_key UNIQUE (auth0_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);
ALTER TABLE ONLY public.users_profiles
    ADD CONSTRAINT users_profiles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users_profiles
    ADD CONSTRAINT users_profiles_username_key UNIQUE (username);
CREATE TRIGGER set_public_images_comments_updated_at BEFORE UPDATE ON public.images_comments FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_images_comments_updated_at ON public.images_comments IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_images_updated_at BEFORE UPDATE ON public.images FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_images_updated_at ON public.images IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_profiles_updated_at BEFORE UPDATE ON public.users_profiles FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_profiles_updated_at ON public.users_profiles IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.images_comments
    ADD CONSTRAINT images_comments_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.images_comments
    ADD CONSTRAINT images_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(email) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(email) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.users_profiles(id) ON UPDATE CASCADE ON DELETE SET NULL;
```

### Functions

Install all dependencies (including the Functions [Core Tools](https://docs.microsoft.com/en-gb/azure/azure-functions/functions-run-local)), add `local.settings.json`, and run locally:

```bash
yarn # or npm install
yarn build # Run webpack
func start
```

`local.settings.json`
```json
{
  "IsEncrypted": false,
  "Values": {
    "CLOUDINARY_NAME": "<unsigned upload preset name>"
  }
}
```

### Nuxt

Install all dependencies, add an ENV file, and run locally with:

```bash
yarn # or npm install
yarn develop
```

`.env`
```
APP_URL=http://localhost:3000
AUTH0_CLIENT_DOMAIN=<auth0-application-domain>
AUTH0_CLIENT_ID=<auth0-application-id>
APOLLO_ENDPOINT=<hasura-endpoint>
APOLLO_WSS_ENDPOINT=<hasura-wss-endpoint>
CLOUDINARY_PRESET=<unsigned-upload-preset>
CLOUDINARY_NAME=<account-name>
```
