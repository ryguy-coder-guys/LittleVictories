drop database if exists little_victories;
create database little_victories;
use little_victories;

grant all on *.* to 'root'@'localhost' with grant option; 

create table Users (
  id varchar(36) primary key,
  createdAt datetime not null,
  updatedAt datetime not null,
  username varchar(25) not null,
  hash text not null
  -- salt text not null,
  -- activationKey float not null,
  -- resetPasswordKey float not null,
  -- verified bool not null
);

create table Habits (
	id int primary key auto_increment,
  user_id varchar(25) not null,
  description varchar(50) not null,
  frequency enum('daily', 'weekly', 'monthly') not null,
  days_of_week varchar(11),
  calendar_date int,
  foreign key (user_id) references Users(id)
);

create table Lists (
	id int primary key auto_increment,
  name varchar(15),
  createdAt datetime not null,
  updatedAt datetime not null
);

create table Tasks (
	id int primary key auto_increment,
  user_id varchar(25) not null,
	description varchar(150) not null,
  due_date date,
  minutes_to_complete int not null,
  is_important bool not null,
  is_complete bool not null,
  completed_at date,
  is_public bool not null default false,
  list_id int not null,
  createdAt datetime not null,
  updatedAt datetime not null,
  foreign key (list_id) references Lists(id),
  foreign key (user_id) references Users(id)
);

create table TaskHabits (
	id int primary key auto_increment,
	task_id int not null,
  user_id varchar(25) not null,
  foreign key (user_id) references Users(id),
  foreign key (task_id) references Tasks(id)
);

create table Comments (
	id int primary key auto_increment,
  user_id varchar(25) not null,
	task_id int not null,
  content varchar(50) not null,
  created_at datetime default now(),
  foreign key (user_id) references Users(id),
  foreign key (task_id) references Tasks(id)
);

create table CommentHearts (
	id int primary key auto_increment,
	comment_id int not null,
  user_id varchar(25) not null,
  foreign key (user_id) references Users(id),
  foreign key (comment_id) references Comments(id)
);

create table JournalEntries (
	id int primary key auto_increment,
	user_id varchar(25) not null,
  created_at datetime not null default now(),
  content text not null,
  foreign key (user_id) references Users(id)
);

create table UserStats (
	id int primary key auto_increment,
	user_id varchar(25) not null,
  created_at datetime not null default now(),
  sleep_hours int,
  eaten_well bool,
  exercised bool,
  notes varchar(150),
  mood enum('great', 'good', 'ok', 'bad', 'terrible'),
  foreign key (user_id) references Users(id)
);


/* run from project root
/* mysql -u root < server/database/schema.sql