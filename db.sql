

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--table:
CREATE TABLE users(
  id varchar PRIMARY KEY not null,
  email varchar not null default '',
  password varchar not null default '',
  reset_password_token varchar,
  reset_password_sent_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  recovery_pin varchar
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
CREATE SEQUENCE users_id_seq OWNED BY users.id;
ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);

CREATE INDEX "index_users_on_email" on users(email);
CREATE UNIQUE INDEX "index_users_on_reset_password_token" on users(reset_password_token);

 alter table users  add constraint UQ_users_email  unique (email);

CREATE TABLE parents(
  id varchar PRIMARY KEY not null,
  description varchar,
  user_id varchar,
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY(user_id)
     REFERENCES users(id)
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON parents
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
CREATE SEQUENCE parents_id_seq OWNED BY parents.id;
ALTER TABLE parents ALTER COLUMN id SET DEFAULT nextval('parents_id_seq'::regclass);

CREATE INDEX "index_parents_on_user_id" on parents(user_id);


CREATE TABLE childrens(
  id varchar PRIMARY KEY not null,
  name varchar,
  parent_id varchar not null,
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(parent_id)
      REFERENCES parents(id)
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON childrens
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
CREATE SEQUENCE childrens_id_seq OWNED BY childrens.id;
ALTER TABLE childrens ALTER COLUMN id SET DEFAULT nextval('childrens_id_seq'::regclass);

CREATE INDEX "index_parents_on_parent_id" on childrens(parent_id);

