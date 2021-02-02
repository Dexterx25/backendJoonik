

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
  encrypted_password varchar not null default '',
  reset_password_token varchar,
  reset_password_sent_at TIMESTAMP,
  remember_created_at TIMESTAMP, 
  first_name varchar,
  last_name varchar,
  full_name varchar,
  datebirthday varchar,
  avatar varchar,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  recovery_pin varchar,
  country_code integer,
  phone_number varchar,
  facebook_avatar varchar,
  time_zone varchar,
  unseen_notifications integer default 0,
  language integer default 0
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


CREATE TABLE channelchats(
  id varchar PRIMARY KEY not null,
  channel_name varchar,
  user_id varchar,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP,
    FOREIGN KEY(user_id)
     REFERENCES users(id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON channelchats
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


--CREATE SEQUENCE FOR EVENTS TABLE: 
CREATE SEQUENCE channelchats_id_seq OWNED BY channelchats.id;
ALTER TABLE channelchats ALTER COLUMN id SET DEFAULT nextval('channelchats_id_seq'::regclass);
--Indexings for events Table: 
CREATE INDEX "index_channelchats_on_deleted_at" on channelchats(deleted_at);
CREATE INDEX "index_channelchats_on_user_id" on channelchats(user_id);


--CREATE friendship_requests TABLE: 
CREATE TABLE friendship_requests(
  id varchar PRIMARY KEY not null,
  user_id varchar,
  friend_id varchar,
  aasm_state varchar,
  parent_friendship_request_id varchar,
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON friendship_requests
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
--CREATE SEQUENCE FOR friendship_requests table: 
CREATE SEQUENCE friendship_requests_id_seq OWNED BY friendship_requests.id;
ALTER TABLE friendship_requests ALTER COLUMN id SET DEFAULT nextval('friendship_requests_id_seq'::regclass);


--CREATE devices TABLE:
CREATE TABLE devices(
    id varchar PRIMARY KEY not null,
    token varchar not null,
    identifier varchar not null,
    os integer not null,
    user_id varchar,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY(user_id) 
      REFERENCES users(id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON devices
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--SEQUENCES devices table:
CREATE SEQUENCE devices_id_seq OWNED BY devices.id;
ALTER TABLE devices ALTER COLUMN id SET DEFAULT nextval('devices_id_seq'::regclass);

--CREATE Indexings for devices tanble:
CREATE INDEX "index_devices_on_user_id" on devices(user_id);


--authetications table: 
CREATE TABLE authentications(
  id varchar PRIMARY KEY not null,
  user_id varchar,
  uid varchar,
  encrypted_password varchar not null default '',
  provider varchar,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY(user_id)
     REFERENCES users(id)
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON authentications
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--SEQUENCES authentications table: 
CREATE SEQUENCE authentications_id_seq OWNED BY authentications.id;
ALTER TABLE authentications ALTER COLUMN id SET DEFAULT nextval('authentications_id_seq'::regclass);


--INDEXING authentications table: 
--CREATE INDEX "authentications_pkey" on authentications(id);
CREATE INDEX "index_authentications_on_user_id" on authentications(user_id);

CREATE TABLE admins(
  id varchar PRIMARY KEY not null,
  admin_id varchar not null,
  full_name varchar not null,
  email varchar not null,
  encrypted_password varchar not null,
  reset_password_token varchar,
  reset_password_sent_at TIMESTAMP,
  remember_created_at TIMESTAMP, 
  first_name varchar,
  last_name varchar,
  avatar varchar,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  recovery_pin varchar,
  country_code integer,
  phone_number varchar,
  facebook_avatar varchar,
  time_zone varchar,
  unseen_notifications integer default 0,
  language integer default 0
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON admins
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
CREATE SEQUENCE admins_id_seq OWNED BY admins.id;
ALTER TABLE admins ALTER COLUMN id SET DEFAULT nextval('admins_id_seq'::regclass);

CREATE INDEX "index_admins_on_email" on admins(email);
CREATE UNIQUE INDEX "index_admins_on_reset_password_token" on admins(reset_password_token);

 alter table admins  add constraint UQ_admins_email  unique (email);



CREATE TABLE messages(
  id varchar PRIMARY KEY not null,
  user_id varchar not null,
  channel_id varchar not null,
  full_name varchar not null,
  message text, 
  file varchar,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP,
  FOREIGN KEY(user_id)
     REFERENCES users(id),
  FOREIGN KEY(channel_id)
     REFERENCES channelchats(id) 
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON messages
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


--CREATE SEQUENCE FOR EVENTS TABLE: 
CREATE SEQUENCE messages_id_seq OWNED BY messages.id;
ALTER TABLE messages ALTER COLUMN id SET DEFAULT nextval('messages_id_seq'::regclass);
--Indexings for events Table: 
CREATE INDEX "index_messages_on_deleted_at" on messages(deleted_at);
CREATE INDEX "index_messages_on_channelchats_id" on messages(channel_id);
CREATE INDEX "index_messages_on_user_id" on messages(user_id);

CREATE TABLE cards(
    id varchar PRIMARY KEY not null,
    user_id varchar not null,
    banc_name varchar not null,
    count_number varchar not null,
    nickname varchar,
    deleted_at TIMESTAMP,
    vcc varchar not null,
    type_card varchar not null,
      FOREIGN KEY(user_id)
        REFERENCES users(id)
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON cards
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE SEQUENCE cards_id_seq OWNED BY cards.id;
ALTER TABLE cards ALTER COLUMN id SET DEFAULT nextval('cards_id_seq'::regclass);

CREATE INDEX "index_cards_on_deleted_at" on cards(deleted_at);
CREATE INDEX "index_cards_on_user_id" on cards(user_id);



CREATE TABLE products(
    id varchar PRIMARY KEY not null,
    name varchar not null,
    type_product varchar not null,
    image varchar not null,
    stage varchar,
    price varchar not null,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE SEQUENCE products_id_seq OWNED BY products.id;
ALTER TABLE products ALTER COLUMN id SET DEFAULT nextval('products_id_seq'::regclass);

CREATE INDEX "index_products_on_deleted_at" on products(deleted_at);
CREATE INDEX "index_products_on_user_id" on products(user_id);


CREATE TABLE transactions(
    id varchar PRIMARY KEY not null,
    user_id varchar not null,
    cards_id varchar not null,
    product_id varchar not null,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),    
     FOREIGN KEY(user_id)
       REFERENCES users(id),
     FOREIGN KEY(cards_id)
       REFERENCES cards(id),
     FOREIGN KEY(product_id)
       REFERENCES products(id)   
);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE SEQUENCE transactions_id_seq OWNED BY transactions.id;
ALTER TABLE transactions ALTER COLUMN id SET DEFAULT nextval('transactions_id_seq'::regclass);

CREATE INDEX "index_transactions_on_deleted_at" on transactions(deleted_at);
CREATE INDEX "index_transactions_on_user_id" on transactions(user_id);

CREATE TABLE admins_codes(
  id varchar not null PRIMARY KEY,
  code varchar not null,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()   

);
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON admins_codes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE SEQUENCE admins_codes_id_seq OWNED BY admins_codes.id;
ALTER TABLE admins_codes ALTER COLUMN id SET DEFAULT nextval('admins_codes_id_seq'::regclass);

CREATE INDEX "index_admins_codes_on_deleted_at" on admins_codes(deleted_at);
