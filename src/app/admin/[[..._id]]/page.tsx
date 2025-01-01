"use client";

import styles from "./page.module.css";
import useEvents from "@/hooks/useEvents";
import useUser from "@/hooks/useUser";
import { EventType } from "@/types/types";
import ToJsx from "@/ui/jsx/jsx";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Vibrant } from "node-vibrant/browser";
import {
  FormEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

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

const defaultEvent: EventType = {
  _id: ``,
  title: `Event Name`,
  picture: `AgACAgIAAxkBAAIEU2bAemXsC2637DDaH2RfEeluu0NmAAJr4TEb8x4BSvU86RHWlyQHAQADAgADdwADNQQ`,
  color: `#000000`,
  description: `<b>bold</b>\n<i>italic</i>\n<u>underline</u>\n<s>strikethrough</s>\n<tg-spoiler>spoiler</tg-spoiler>\n<b>bold <i>italic bold <s>italic bold strikethrough </s> <u>underline italic bold</u></i> bold</b>\n<a href="http://chebarash.uz">inline URL</a>\n<a href="http://t.me/puevent">inline mention of a user</a>\n<code>inline fixed-width code</code>\n<pre>pre-formatted fixed-width code block</pre>\n<blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote>\n<blockquote expandable>Expandable block quotation started\nExpandable block quotation continued\nExpandable block quotation continued\nHidden by default part of the block quotation started\nExpandable block quotation continued\nThe last line of the block quotation</blockquote>`,
  author: {
    _id: ``,
    name: ``,
    description: ``,
    cover: ``,
    username: ``,
    links: [],
  },
  authorModel: `clubs`,
  date: new Date(),
  venue: venues[0],
  duration: 1000 * 60 * 60 * 3,
  shares: 0,
  registered: [],
  participated: [],
  hashtags: [],
};

const defaultTemplate = `<b>{{title}}</b>\n\n{{description}}\n\n<b>Venue:</b> {{venue}}\n<b>Date:</b> {{date}}\n<b>Time:</b> {{time}}\n<b>Author:</b> {{author}}\n<b>Duration:</b> {{duration}}`;

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: any;
}) => {
  return (
    <section className={styles.section}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </section>
  );
};

const SectionOptional = ({
  title,
  description,
  children,
  name,
  event,
  update,
  value,
}: {
  title: string;
  description?: string;
  children: any;
  name: keyof EventType;
  event: EventType;
  update: (e: Partial<EventType>) => any;
  value: any;
}) => {
  return (
    <Section title={title} description={description}>
      {event[name] ? (
        children
      ) : (
        <button
          type="button"
          className={styles.button}
          onClick={() => update({ [name]: value })}
        >
          Add
        </button>
      )}
    </Section>
  );
};

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
  update: (e: Partial<EventType>) => any;
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
    onChange={(e) => update({ [name]: e.target.value })}
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
  update: (e: Partial<EventType>) => any;
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
        update({ [name]: e.target.value });
        e.target.style.height = `0`;
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      style={{ resize: `none` }}
    ></textarea>
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

export default function AdminPage({
  params: { _id },
}: {
  params: { _id?: Array<string> };
}) {
  const ref = useRef<HTMLFormElement>(null);
  const { user, loading } = useUser();
  const { events, editEvent, createEvent } = useEvents();
  const [event, setEvent] = useState<EventType>(
    _id ? events[_id.join(``)] : defaultEvent
  );
  const [waiting, setWait] = useState<boolean>(false);
  const update = (e: Partial<EventType>) =>
    setEvent((event) => ({ ...event, ...e }));
  const [colors, setColors] = useState<Array<string>>([`#000000`]);

  const orgs = [
    user?.organizer ? [user] : [],
    user?.clubs ? user.clubs : [],
  ].flat();

  useEffect(() => {
    if (orgs.length && user && !_id)
      update({
        author: orgs[0],
        authorModel: user.organizer ? `users` : `clubs`,
      });
  }, [user]);

  const submit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!ref.current?.reportValidity()) return;
    if (waiting) return;
    window.Telegram.WebApp.showConfirm(
      `Are you sure you want to ${_id ? `edit` : `organize`} "${event.title}"?`,
      async (ok) => {
        if (ok) {
          setWait(true);
          await (_id ? editEvent : createEvent)(event);
          setWait(false);
        }
      }
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const colors = await Vibrant.from(
          process.env.NEXT_PUBLIC_BASE_URL + `/photo/` + event.picture
        ).getPalette();
        const c = [
          colors.Vibrant?.hex,
          colors.DarkVibrant?.hex,
          colors.LightVibrant?.hex,
          colors.Muted?.hex,
          colors.DarkMuted?.hex,
          colors.LightMuted?.hex,
        ].filter((color) => color != undefined) as Array<string>;
        setColors(c);
        if (!c.includes(event.color)) update({ color: c[0] });
      } catch (e) {}
    })();
  }, [event.picture]);

  useEffect(() => {
    const { MainButton, themeParams } = window.Telegram.WebApp;
    MainButton.onClick(submit);
    MainButton.setParams({
      is_active: true,
      is_visible: true,
      text: _id ? `Save` : `Create`,
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

  if (!loading && !orgs.length) return notFound();
  if (_id && !events[_id.join(``)]) return notFound();
  if (!user) return <></>;

  return (
    <main>
      <form ref={ref} className={styles.form} onSubmit={submit}>
        {orgs.length > 1 && !_id && (
          <Section title="Author" description="Choose a club">
            <select
              required
              name="author"
              id="author"
              onChange={(e) => {
                const author = orgs.find(({ _id }) => _id == e.target.value);
                if (author)
                  update({
                    author,
                    authorModel: e.target.value == user._id ? `users` : `clubs`,
                  });
              }}
              value={event.author._id}
            >
              {orgs.map(({ _id, name }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
            </select>
          </Section>
        )}
        {_id && (
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
          <Input minLength={3} name="title" event={event} update={update} />
        </Section>
        <Section
          title="Description"
          description="Describe the event in detail, you can use formatting that is supported in telegram."
        >
          <TextArea name="description" event={event} update={update} />
        </Section>
        <Section
          title="Picture"
          description="Just send a 16x9 photo to the bot and copy and paste his answer."
        >
          <Input
            pattern="^AgACAgIAAxkBAAI[A-Za-z0-9_\-]{53,70}$"
            name="picture"
            event={event}
            update={update}
          />
        </Section>
        <Section title="Color" description="Choose event cart color.">
          <select
            required
            name="author"
            id="author"
            onChange={(e) =>
              update({
                color: e.target.value,
              })
            }
            value={event.color}
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <div className={styles.colors}>
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                style={{
                  backgroundColor: color,
                  width: `calc(100% / ${colors.length})`,
                }}
                onClick={() => update({ color })}
              >
                {event.color == color && (
                  <svg width="20" height="21" viewBox="0 0 20 21">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.0003 0.5H20.0003V19.5H16.0003V7.32843L3.0003 20.3284L0.171875 17.5L13.1719 4.5H1.0003V0.5Z"
                      fill="#ffffff"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
          <Image
            className={styles.cover}
            src={process.env.NEXT_PUBLIC_BASE_URL + `/photo/` + event.picture}
            alt="cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </Section>
        <Section
          title="Date"
          description="Enter the time in GMT+0, which means the time in Tashkent minus five hours."
        >
          <Input
            name="date"
            type="datetime-local"
            defaultValue={formatDateToISO(event.date)}
            event={event}
            update={({ date }) => {
              if (date && `${date}`.length) update({ date: new Date(date) });
            }}
          />
        </Section>
        <Section title="Venue" description="Choose a venue for the event.">
          <Input
            minLength={2}
            name="venue"
            list="venues"
            event={event}
            update={update}
          />
          <datalist id="venues">
            {venues.map((venue) => (
              <option key={venue} value={venue} />
            ))}
          </datalist>
        </Section>
        <Section title="Duration" description="Event duration in hours.">
          <Input
            min={1}
            type="number"
            name="duration"
            event={event}
            value={event.duration / (1000 * 60 * 60)}
            update={({ duration }) => {
              if (duration)
                update({
                  duration: parseInt(`${duration}`) * 1000 * 60 * 60,
                });
            }}
          />
        </Section>
        <SectionOptional
          title="Content"
          description="The message media that the user will see when you share the event. Just send a photo or video to the bot and copy-paste its response."
          value={{
            type: `photo`,
            fileId: event.picture,
          }}
          event={event}
          update={update}
          name="content"
        >
          <Input
            pattern="^(AgACAgIAAxkBAAI|BAACAgIAAxkBAAI)[A-Za-z0-9_\-]{53,70}$"
            name="content"
            value={event.content?.fileId}
            event={event}
            update={({ content }) => {
              update({
                content: `${content}`.length
                  ? {
                      type: /^AgACAgIAAxkBAAI[A-Za-z0-9_\-]{53,70}$/.test(
                        `${content}`
                      )
                        ? `photo`
                        : `video`,
                      fileId: `${content}`,
                    }
                  : undefined,
              });
            }}
          />
          <section className={styles.preview}>
            {event.content?.type == `photo` ? (
              <Image
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  `/photo/` +
                  event.content.fileId
                }
                alt="cover"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                priority
              />
            ) : (
              <p>Video preview is not available</p>
            )}
          </section>
        </SectionOptional>
        <SectionOptional
          title="Template"
          description="The message template that the user will see when you share the event, you can use variables like {{title}}."
          value={defaultTemplate}
          event={event}
          update={update}
          name="template"
        >
          <TextArea
            minLength={10}
            required
            name="template"
            event={event}
            update={({ template }) =>
              update({
                template: template!.length ? template : undefined,
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
                    duration: `${event.duration / (1000 * 60 * 60)} ${
                      event.duration / (1000 * 60 * 60) == 1 ? `hour` : `hours`
                    }`,
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
          value="Open in Event"
          event={event}
          update={update}
          name="button"
        >
          <Input
            name="button"
            event={event}
            update={({ button }) =>
              update({
                button: button!.length ? button : undefined,
              })
            }
          />
        </SectionOptional>
        <SectionOptional
          title="External"
          description="Custom registration link"
          event={event}
          update={update}
          name="external"
          value="https://t.me/puevent"
        >
          <Input
            type="url"
            name="external"
            event={event}
            update={({ external }) =>
              update({
                external: external!.length ? external : undefined,
              })
            }
          />
        </SectionOptional>
        <SectionOptional
          title="Spots"
          description="Limit number of registrations"
          event={event}
          update={update}
          name="spots"
          value={1}
        >
          <Input
            type="number"
            name="spots"
            min={1}
            event={event}
            update={({ spots }) =>
              update({
                spots: `${spots}`.length ? parseInt(`${spots}`) : undefined,
              })
            }
          />
        </SectionOptional>
        <SectionOptional
          title="Deadline"
          description="Registration deadline"
          event={event}
          update={update}
          name="deadline"
          value={new Date()}
        >
          <Input
            name="deadline"
            type="datetime-local"
            defaultValue={event.deadline && formatDateToISO(event.deadline)}
            event={event}
            update={({ deadline }) => {
              update({
                deadline:
                  deadline && `${deadline}`.length
                    ? new Date(deadline)
                    : undefined,
              });
            }}
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
        <button type="submit" style={{ display: `none` }}></button>
      </form>
    </main>
  );
}
