"use client";

import { EventType, EventContextType } from "@/types/types";
import { Vibrant } from "node-vibrant/browser";
import styles from "./admin.module.css";
import useUser from "@/hooks/useUser";
import ToJsx from "@/ui/jsx/jsx";
import Image from "next/image";
import {
  FormEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import Loading from "../loading/loading";
import { useSearchParams } from "next/navigation";
import { getTimeRemaining } from "../event/event";
import Card from "../card/card";

const venues = [
  `Conference Hall`,
  `Library`,
  `Canteen`,
  `UCA Basement`,
  `Media Lab`,
  `Gym`,
  `Parking`,
  `Lobby`,
  `Yard`,
  `MATH 104`,
  `MATH 105`,
  `MATH 106`,
  `MATH 107`,
  `MATH 108`,
  `MATH 109`,
  `MATH 110`,
  `MATH 201`,
  `MATH 204`,
  `MATH 205`,
  `MATH 206`,
  `MATH 207`,
  `MATH 208`,
  `MATH 209`,
  `MATH 210`,
  `MATH 301`,
  `MATH 304`,
  `MATH 305`,
  `MATH 306`,
  `MATH 307`,
  `MATH 308`,
  `MATH 309`,
  `MATH 310`,
  `MATH B07`,
  `MATH B08`,
  `MATH B09`,
  `UCA 204`,
  `UCA 205`,
  `UCA 209`,
  `UCA 214`,
  `UCA 215`,
  `UCA 219`,
  `UCA B14`,
  `UCA 2nd Floor`,
];

const defaultTemplate = `<b>{{title}}</b>\n\n{{description}}\n\n<b>Venue:</b> {{venue}}\n<b>Date:</b> {{date}}\n<b>Time:</b> {{time}}\n<b>Author:</b> {{author}}\n<b>Duration:</b> {{duration}}`;

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: any;
}) => (
  <section className={styles.section}>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    {children}
  </section>
);

const SectionOptional = ({
  title,
  description,
  children,
  name,
  event,
  update,
}: {
  title: string;
  description?: string;
  children: any;
  name: keyof EventType;
  event: EventType;
  update: () => any;
}) => (
  <Section title={title} description={description}>
    {event[name] ? (
      children
    ) : (
      <button type="button" className={styles.button} onClick={update}>
        Add
      </button>
    )}
  </Section>
);

const Input = ({
  required = true,
  type = `text`,
  name,
  event,
  update,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  name: keyof EventType;
  event: EventType;
  update: (e: string) => any;
}) => (
  <input
    {...props}
    required={required}
    type={type}
    name={name}
    id={name}
    value={
      props.defaultValue || props.value ? props.value : (event[name] as string)
    }
    onChange={(e) => update(e.target.value)}
  />
);

const TextArea = ({
  required = true,
  name,
  event,
  update,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: keyof EventType;
  event: EventType;
  update: (e: string) => any;
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `0`;
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref]);

  return (
    <textarea
      {...props}
      ref={ref}
      name={name}
      id={name}
      required={required}
      value={event[name] as string}
      onChange={(e) => {
        update(e.target.value);
        e.target.style.height = `0`;
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      style={{ resize: `none` }}
    ></textarea>
  );
};

const ColorPicker = ({
  name,
  colors,
  event,
  update,
}: {
  name: `fg` | `bg`;
  colors: Array<string>;
  event: EventType;
  update: (e: Partial<EventType>) => any;
}) => {
  const notName = name == `bg` ? `fg` : `bg`;
  return (
    <div className={styles.colors}>
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          style={{
            backgroundColor: color,
            width: `calc(100% / ${colors.length})`,
          }}
          onClick={() =>
            update({
              [name]: color,
              [notName]: color == event[notName] ? event[name] : event[notName],
            })
          }
        >
          {event[name] == color && (
            <svg width="20" height="21" viewBox="0 0 20 21">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.0003 0.5H20.0003V19.5H16.0003V7.32843L3.0003 20.3284L0.171875 17.5L13.1719 4.5H1.0003V0.5Z"
                fill={event[notName]}
              />
            </svg>
          )}
        </button>
      ))}
    </div>
  );
};

const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default function Admin(
  props:
    | (EventContextType & { editing: true })
    | { create: (event: EventType) => any; editing?: false }
) {
  const ref = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const pictureParam = searchParams.get("picture");
  const contentParam = searchParams.get("content");
  const descriptionParam = searchParams.get("description");
  const defaultEvent: EventType = {
    _id: ``,
    title: `Event Name`,
    picture:
      pictureParam ||
      `AgACAgIAAxkBAAIEU2bAemXsC2637DDaH2RfEeluu0NmAAJr4TEb8x4BSvU86RHWlyQHAQADAgADdwADNQQ`,
    bg: `#000000`,
    fg: `#ffffff`,
    description:
      descriptionParam ||
      `<b>bold</b>\n<i>italic</i>\n<u>underline</u>\n<s>strikethrough</s>\n<tg-spoiler>spoiler</tg-spoiler>\n<b>bold <i>italic bold <s>italic bold strikethrough </s> <u>underline italic bold</u></i> bold</b>\n<a href="http://chebarash.uz">inline URL</a>\n<a href="http://t.me/puevent">inline mention of a user</a>\n<code>inline fixed-width code</code>\n<pre>pre-formatted fixed-width code block</pre>\n<blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote>\n<blockquote expandable>Expandable block quotation started\nExpandable block quotation continued\nExpandable block quotation continued\nHidden by default part of the block quotation started\nExpandable block quotation continued\nThe last line of the block quotation</blockquote>`,
    author: {
      _id: ``,
      name: ``,
      description: ``,
      cover: ``,
      hidden: false,
      leader: {
        _id: ``,
        name: ``,
        email: ``,
        id: 0,
        member: [],
        clubs: [],
      },
      bg: ``,
      fg: ``,
      members: 0,
      rank: 0,
      events: [],
    },
    date: new Date(),
    venue: venues[0],
    duration: 1000 * 60 * 60 * 3,
    shares: 0,
    registered: [],
    participated: [],
    hashtags: [],
    content: contentParam ? { fileId: contentParam, type: `video` } : undefined,
  };
  const { user } = useUser();
  const [event, setEvent] = useState<EventType>(
    props.editing ? props : defaultEvent
  );
  const [waiting, setWait] = useState<boolean>(false);
  const update = (e: Partial<EventType>) =>
    setEvent((event) => ({ ...event, ...e }));
  const [colors, setColors] = useState<Array<string>>([`#000000`]);

  useEffect(() => {
    if (user && user.clubs.length && !props.editing)
      update({
        author: user.clubs[0],
      });
  }, [user]);

  const submit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!ref.current?.reportValidity()) return;
    if (waiting) return;
    window.Telegram.WebApp.showConfirm(
      `Are you sure you want to ${props ? `edit` : `organize`} "${
        event.title
      }"?`,
      async (ok) => {
        if (ok) {
          setWait(true);
          await (props.editing ? props.edit : props.create)(event);
          setWait(false);
        }
      }
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const colors = await Vibrant.from(
          `${process.env.NEXT_PUBLIC_BASE_URL}/photo/${event.picture}`
        ).getPalette();
        const c = [
          colors.Vibrant?.hex,
          colors.DarkVibrant?.hex,
          colors.LightVibrant?.hex,
          colors.Muted?.hex,
          colors.DarkMuted?.hex,
          colors.LightMuted?.hex,
        ].filter((color) => color != undefined) as Array<string>;
        const list = Array.from(new Set([`#ffffff`, `#000000`, ...c]));
        setColors(list);
        if (!list.includes(event.bg)) update({ bg: list[1] });
        if (!list.includes(event.fg)) update({ fg: list[0] });
      } catch (e) {}
    })();
  }, [event.picture]);

  useEffect(() => {
    const { MainButton, themeParams } = window.Telegram.WebApp;
    MainButton.onClick(submit);
    MainButton.setParams({
      is_active: true,
      is_visible: true,
      text: props.editing ? `Save` : `Create`,
      color: themeParams.section_bg_color,
      text_color: themeParams.text_color,
    });
    return () => {
      MainButton.setParams({
        is_active: false,
        is_visible: false,
      });
      MainButton.offClick(submit);
    };
  }, [event, waiting]);

  if (!user) return <Loading />;

  return (
    <main>
      <form ref={ref} className={styles.form} onSubmit={submit}>
        {user.clubs.length > 1 && !props.editing && (
          <Section title="Author" description="Choose a club">
            <select
              required
              name="author"
              id="author"
              onChange={(e) => {
                const author = user.clubs.find(
                  ({ _id }) => _id == e.target.value
                );
                if (author) update({ author });
              }}
              value={event.author._id}
            >
              {user.clubs.map(({ _id, name }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
            </select>
          </Section>
        )}
        {props.editing && (
          <Section
            title="Event status"
            description="If you can not organize an event, you can cancel it."
          >
            <button
              type="button"
              className={styles.button}
              onClick={() => update({ cancelled: !event.cancelled })}
            >
              {event.cancelled ? `Cancelled` : `Confirmed`}
            </button>
          </Section>
        )}
        <Section title="Title" description="Name of the event max 100 symbols.">
          <Input
            minLength={3}
            name="title"
            event={event}
            update={(title) => update({ title })}
          />
        </Section>
        <Section
          title="Description"
          description="Describe the event in detail, you can use formatting that is supported in telegram."
        >
          <TextArea
            name="description"
            event={event}
            update={(description) => update({ description })}
          />
          <div className={styles.preview}>
            <ToJsx>{event.description}</ToJsx>
          </div>
        </Section>
        <Section
          title="Picture"
          description="Just send a 16x9 photo to the bot and copy and paste his answer."
        >
          <Input
            pattern="^AgACAgIAAxkBA[A-Za-z0-9_\-]{53,90}$"
            name="picture"
            event={event}
            update={(picture) => update({ picture })}
          />
          <button
            type="button"
            className={styles.button}
            onClick={async () =>
              update({ picture: await navigator.clipboard.readText() })
            }
          >
            Paste
          </button>
        </Section>
        <Section title="Colors" description="Choose event card colors.">
          <select
            required
            name="bg"
            id="bg"
            onChange={(e) =>
              update({
                bg: e.target.value,
                fg: e.target.value == event.fg ? event.bg : event.fg,
              })
            }
            value={event.bg}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <ColorPicker
            colors={colors}
            name="bg"
            event={event}
            update={update}
          />
          <select
            required
            name="fg"
            id="fg"
            onChange={(e) =>
              update({
                fg: e.target.value,
                bg: e.target.value == event.bg ? event.fg : event.bg,
              })
            }
            value={event.fg}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <ColorPicker
            colors={colors}
            name="fg"
            event={event}
            update={update}
          />
          <Card {...event} disabled type="event" />
        </Section>
        <Section title="Date" description="The exact time of the event start.">
          <Input
            name="date"
            type="datetime-local"
            defaultValue={formatDateToISO(event.date)}
            event={event}
            update={(date) => {
              if (date && date.length) update({ date: new Date(date) });
            }}
          />
        </Section>
        <Section title="Duration" description="Event duration in minutes.">
          <Input
            min={1}
            type="number"
            name="duration"
            event={event}
            value={event.duration / (1000 * 60)}
            update={(duration) => {
              if (duration)
                update({
                  duration: parseInt(`${duration}`) * 1000 * 60,
                });
            }}
          />
        </Section>
        <Section title="Venue" description="Choose a venue for the event.">
          <Input
            minLength={2}
            name="venue"
            list="venues"
            event={event}
            update={(venue) => update({ venue })}
          />
          <datalist id="venues">
            {venues.map((venue) => (
              <option key={venue} value={venue} />
            ))}
          </datalist>
        </Section>
        <SectionOptional
          title="Content"
          description="The message media that the user will see when you share the event. Just send a photo or video to the bot and copy-paste its response."
          event={event}
          update={() =>
            update({
              content: {
                type: `photo`,
                fileId: event.picture,
              },
            })
          }
          name="content"
        >
          <Input
            pattern="^(AgACAgIAAxkBA|BAACAgIAAxkBA)[A-Za-z0-9_\-]{53,90}$"
            name="content"
            value={event.content?.fileId}
            event={event}
            update={(fileId) => {
              update({
                content: fileId.length
                  ? {
                      type: /^AgACAgIAAxkBA[A-Za-z0-9_\-]{53,90}$/.test(fileId)
                        ? `photo`
                        : `video`,
                      fileId,
                    }
                  : undefined,
              });
            }}
          />
          <button
            type="button"
            className={styles.button}
            onClick={async () => {
              const data = await navigator.clipboard.readText();
              update({
                content: data.length
                  ? {
                      type: /^AgACAgIAAxkBA[A-Za-z0-9_\-]{53,90}$/.test(data)
                        ? `photo`
                        : `video`,
                      fileId: data,
                    }
                  : undefined,
              });
            }}
          >
            Paste
          </button>
          {event.content && (
            <section className={styles.preview}>
              {event.content.type == `photo` ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${event.content.fileId}`}
                  alt="cover"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              ) : (
                <video
                  controls
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/video/${event.content.fileId}`}
                />
              )}
            </section>
          )}
        </SectionOptional>
        <SectionOptional
          title="Template"
          description="The message template that the user will see when you share the event, you can use variables like {{title}}."
          event={event}
          update={() => update({ template: defaultTemplate })}
          name="template"
        >
          <TextArea
            minLength={10}
            required
            name="template"
            event={event}
            update={(template) =>
              update({
                template: template.length ? template : undefined,
              })
            }
          />
          <div className={styles.preview}>
            <ToJsx>
              {event.template
                ? Object.entries({
                    ...event,
                    date:
                      new Date(event.date).toLocaleDateString(`en`, {
                        month: `long`,
                        timeZone: `Asia/Tashkent`,
                      }) +
                      ` ` +
                      new Date(event.date).toLocaleDateString(`en`, {
                        day: `numeric`,
                        timeZone: `Asia/Tashkent`,
                      }),
                    time: new Date(event.date).toLocaleString(`en`, {
                      timeStyle: `short`,
                      timeZone: `Asia/Tashkent`,
                    }),
                    duration: getTimeRemaining(event.duration).join(` `),
                    author: event.author.name,
                  }).reduce((template, [name, value]) => {
                    return template.replace(
                      new RegExp(`{{${name}}}`, `g`),
                      String(value)
                    );
                  }, event.template)
                : ``}
            </ToJsx>
          </div>
        </SectionOptional>
        <SectionOptional
          title="Button"
          description="Custom button text under message"
          event={event}
          update={() => update({ button: `Open in Event` })}
          name="button"
        >
          <Input
            name="button"
            event={event}
            update={(button) =>
              update({
                button: button.length ? button : undefined,
              })
            }
          />
        </SectionOptional>
        <SectionOptional
          title="External"
          description="Custom registration link"
          event={event}
          update={() => update({ external: `https://t.me/puevent` })}
          name="external"
        >
          <Input
            type="url"
            name="external"
            event={event}
            update={(external) =>
              update({
                external: external.length ? external : undefined,
              })
            }
          />
        </SectionOptional>
        <SectionOptional
          title="Spots"
          description="Limit number of registrations"
          event={event}
          update={() => update({ spots: 1 })}
          name="spots"
        >
          <Input
            type="number"
            name="spots"
            min={1}
            event={event}
            update={(spots) =>
              update({
                spots: spots.length ? parseInt(spots) : undefined,
              })
            }
          />
        </SectionOptional>
        <SectionOptional
          title="Deadline"
          description="Registration deadline"
          event={event}
          update={() => update({ deadline: new Date() })}
          name="deadline"
        >
          <Input
            name="deadline"
            type="datetime-local"
            defaultValue={event.deadline && formatDateToISO(event.deadline)}
            event={event}
            update={(deadline) =>
              update({
                deadline:
                  deadline && deadline.length ? new Date(deadline) : undefined,
              })
            }
          />
        </SectionOptional>
        <Section title="Privacy" description="Event visibility.">
          <button
            type="button"
            className={styles.button}
            onClick={() => update({ private: !event.private })}
          >
            {event.private ? `Only for club members` : `Public`}
          </button>
        </Section>
        <SectionOptional
          title="Voting"
          event={event}
          update={() =>
            update({
              voting: {
                title: `Voting Title`,
                options: event.voting?.options || [],
                votes: event.voting?.votes || [],
              },
            })
          }
          name="voting"
        >
          <Input
            name="voting"
            value={event.voting?.title}
            event={event}
            update={(title) =>
              update({
                voting: title.length
                  ? {
                      title,
                      options: event.voting?.options || [],
                      votes: event.voting?.votes || [],
                    }
                  : undefined,
              })
            }
          />
          <p>Options</p>
          {event.voting?.options.map((option, i) => (
            <Input
              key={i}
              name="voting"
              value={option}
              event={event}
              update={(option) => {
                update({
                  voting: {
                    title: event.voting?.title || ``,
                    options:
                      event.voting?.options
                        .map((o, j) => (i == j ? option : o))
                        .filter((o) => o.length) || [],
                    votes: event.voting?.votes || [],
                  },
                });
              }}
            />
          ))}
          <button
            type="button"
            className={styles.button}
            onClick={() =>
              update({
                voting: {
                  title: event.voting?.title || ``,
                  options: [...(event.voting?.options || []), `Option`],
                  votes: event.voting?.votes || [],
                },
              })
            }
          >
            Add option
          </button>
        </SectionOptional>
        <button type="submit" style={{ display: `none` }}></button>
      </form>
    </main>
  );
}
